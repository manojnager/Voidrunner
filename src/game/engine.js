import { TRACK_HEIGHT, PLAYER_Y, PLAYER_RADIUS, COIN_RADIUS, COIN_VALUE, COIN_SPAWN_INTERVAL_MS, NEAR_MISS_BONUS, COMBO_STEP, MAX_MULTIPLIER, MILESTONE_INTERVAL } from './constants'
import { getSpeedForTime, getSpawnIntervalForTime } from './difficulty'
import { spawnObstacleRow, spawnCoin } from './spawner'
import { checkCollision, findNearMisses } from './collision'

export const createInitialState = () => ({
  status: 'ready',
  playerLane: 1,
  obstacles: [],
  coins: [],
  elapsedMs: 0,
  timeSinceLastSpawn: 0,
  timeSinceLastCoin: 0,
  score: 0,
  coinsCollected: 0,
  combo: 0,
  multiplier: 1,
  speed: 0,
  nearMissCounted: new Set(),
  lastMilestone: 0,
  popups: [],
  nextPopupId: 0,
})

const laneOverlapsBlockedLane = (lane, obstacleRow) => obstacleRow.some((o) => o.lane === lane)

const multiplierFor = (combo) => Math.min(1 + Math.floor(combo / COMBO_STEP) * 0.5, MAX_MULTIPLIER)

export const updateGame = (state, deltaMs) => {
  if (state.status !== 'running') return state

  const speed = getSpeedForTime(state.elapsedMs)
  const spawnInterval = getSpawnIntervalForTime(state.elapsedMs)

  const elapsedMs = state.elapsedMs + deltaMs
  const moveEntity = (e) => ({ ...e, y: e.y + (speed * deltaMs) / 1000 })

  const movedObstacles = state.obstacles.map(moveEntity).filter((o) => o.y < TRACK_HEIGHT + 60)
  const movedCoins = state.coins.map(moveEntity).filter((c) => c.y < TRACK_HEIGHT + 60)

  let timeSinceLastSpawn = state.timeSinceLastSpawn + deltaMs
  let obstacles = movedObstacles
  let newRow = []

  if (timeSinceLastSpawn >= spawnInterval) {
    timeSinceLastSpawn = 0
    newRow = spawnObstacleRow()
    obstacles = [...obstacles, ...newRow]
  }

  let timeSinceLastCoin = state.timeSinceLastCoin + deltaMs
  let coins = movedCoins

  if (timeSinceLastCoin >= COIN_SPAWN_INTERVAL_MS) {
    timeSinceLastCoin = 0
    const candidate = spawnCoin()
    if (!laneOverlapsBlockedLane(candidate.lane, newRow)) {
      coins = [...coins, candidate]
    }
  }

  let nextPopupId = state.nextPopupId
  const popups = []

  const collideDistance = PLAYER_RADIUS + COIN_RADIUS
  let combo = state.combo
  let bonusScore = 0
  let coinsCollected = state.coinsCollected
  coins = coins.filter((coin) => {
    if (coin.lane !== state.playerLane) return true
    const dy = Math.abs(coin.y - PLAYER_Y)
    if (dy < collideDistance) {
      combo += 1
      const mult = multiplierFor(combo)
      const gained = COIN_VALUE * mult
      bonusScore += gained
      coinsCollected += 1
      popups.push({ id: nextPopupId++, text: `+${Math.round(gained)}`, kind: 'coin' })
      return false
    }
    return true
  })

  const newlyMissed = findNearMisses(state.playerLane, obstacles, state.nearMissCounted)
  const nearMissCounted = new Set(state.nearMissCounted)
  newlyMissed.forEach((id) => {
    nearMissCounted.add(id)
    combo += 1
    const mult = multiplierFor(combo)
    const gained = NEAR_MISS_BONUS * mult
    bonusScore += gained
    popups.push({ id: nextPopupId++, text: 'CLOSE CALL! +' + Math.round(gained), kind: 'nearmiss' })
  })

  const collided = checkCollision(state.playerLane, obstacles)
  if (collided) combo = 0

  const multiplier = multiplierFor(combo)
  const timeScore = (deltaMs / 1000) * multiplier
  const score = state.score + timeScore + bonusScore

  let lastMilestone = state.lastMilestone
  if (Math.floor(score / MILESTONE_INTERVAL) > Math.floor(lastMilestone / MILESTONE_INTERVAL)) {
    lastMilestone = score
    popups.push({ id: nextPopupId++, text: 'NICE!', kind: 'milestone' })
  }

  return {
    ...state,
    status: collided ? 'dead' : 'running',
    obstacles,
    coins,
    elapsedMs,
    timeSinceLastSpawn,
    timeSinceLastCoin,
    score,
    coinsCollected,
    combo,
    multiplier,
    speed,
    nearMissCounted,
    lastNearMissIds: newlyMissed,
    lastMilestone,
    popups,
    nextPopupId,
  }
}