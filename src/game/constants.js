export const LANE_COUNT = 4
export const TRACK_WIDTH = 640
export const TRACK_HEIGHT = 800
export const LANE_WIDTH = TRACK_WIDTH / LANE_COUNT

export const PLAYER_Y = TRACK_HEIGHT - 100
export const PLAYER_RADIUS = 18
export const OBSTACLE_WIDTH = LANE_WIDTH * 0.62
export const OBSTACLE_HEIGHT = 28

export const GLIDE_DURATION_MS = 140

export const BASE_OBSTACLE_SPEED = 220
export const BASE_SPAWN_INTERVAL_MS = 950

export const COLLISION_FORGIVENESS = 6

export const laneCenterX = (laneIndex) => laneIndex * LANE_WIDTH + LANE_WIDTH / 2

export const COIN_RADIUS = 12
export const COIN_VALUE = 10
export const COIN_SPAWN_INTERVAL_MS = 1400

export const NEAR_MISS_BONUS = 5
export const COMBO_STEP = 5
export const MAX_MULTIPLIER = 3
export const MILESTONE_INTERVAL = 100