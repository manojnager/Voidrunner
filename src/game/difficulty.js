import { BASE_OBSTACLE_SPEED, BASE_SPAWN_INTERVAL_MS, GLIDE_DURATION_MS } from './constants'

const MAX_SPEED_MULTIPLIER = 2.4
const MAX_SPAWN_REDUCTION = 0.55
const RAMP_RATE = 0.00018

export const getSpeedForTime = (elapsedMs) => {
  const growth = 1 - Math.exp(-elapsedMs * RAMP_RATE)
  const multiplier = 1 + growth * (MAX_SPEED_MULTIPLIER - 1)
  return BASE_OBSTACLE_SPEED * multiplier
}

export const getSpawnIntervalForTime = (elapsedMs) => {
  const growth = 1 - Math.exp(-elapsedMs * RAMP_RATE)
  const reduction = growth * MAX_SPAWN_REDUCTION
  const interval = BASE_SPAWN_INTERVAL_MS * (1 - reduction)
  const floor = GLIDE_DURATION_MS * 2.4
  return Math.max(interval, floor)
}