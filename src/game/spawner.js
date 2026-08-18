import { LANE_COUNT } from './constants'

let nextObstacleId = 0
let nextCoinId = 0

export const resetSpawnerIds = () => {
  nextObstacleId = 0
  nextCoinId = 0
}

export const spawnObstacleRow = () => {
  const blockedCount = Math.floor(Math.random() * (LANE_COUNT - 1))
  const lanes = Array.from({ length: LANE_COUNT }, (_, i) => i)

  for (let i = lanes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = lanes[i]
    lanes[i] = lanes[j]
    lanes[j] = temp
  }

  const blockedLanes = lanes.slice(0, blockedCount)

  return blockedLanes.map((lane) => ({
    id: nextObstacleId++,
    lane,
    y: -40,
  }))
}

export const spawnCoin = () => {
  const lane = Math.floor(Math.random() * LANE_COUNT)
  return {
    id: nextCoinId++,
    lane,
    y: -40,
  }
}