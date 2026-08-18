import {
  PLAYER_Y,
  PLAYER_RADIUS,
  OBSTACLE_HEIGHT,
  COLLISION_FORGIVENESS,
} from './constants'

export const checkCollision = (playerLane, obstacles) => {
  const topEdge = PLAYER_Y - PLAYER_RADIUS + COLLISION_FORGIVENESS
  const bottomEdge = PLAYER_Y + PLAYER_RADIUS - COLLISION_FORGIVENESS

  return obstacles.some((obstacle) => {
    if (obstacle.lane !== playerLane) return false
    const obstacleTop = obstacle.y
    const obstacleBottom = obstacle.y + OBSTACLE_HEIGHT
    return obstacleBottom >= topEdge && obstacleTop <= bottomEdge
  })
}

export const findNearMisses = (playerLane, obstacles, alreadyCounted) => {
  const nearBand = 46
  const missed = []

  obstacles.forEach((obstacle) => {
    if (alreadyCounted.has(obstacle.id)) return
    const distance = Math.abs(obstacle.y + OBSTACLE_HEIGHT - PLAYER_Y)
    const adjacentLane = Math.abs(obstacle.lane - playerLane) === 1
    if (adjacentLane && distance < nearBand) {
      missed.push(obstacle.id)
    }
  })

  return missed
}