import { TRACK_WIDTH, TRACK_HEIGHT, LANE_COUNT, LANE_WIDTH, BASE_OBSTACLE_SPEED } from '../game/constants'
import Player from './Player'
import Obstacle from './Obstacle'
import Coin from './Coin'

const GameCanvas = ({ playerLane, obstacles, coins, speed }) => {
  const scrollDuration = Math.max(0.18, 0.6 * (BASE_OBSTACLE_SPEED / Math.max(speed, 1)))

  return (
    <svg viewBox={`0 0 ${TRACK_WIDTH} ${TRACK_HEIGHT}`} className="game-canvas">
      <defs>
        <linearGradient id="roadFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a4a52" />
          <stop offset="55%" stopColor="#3c3c44" />
          <stop offset="100%" stopColor="#2a2a30" />
        </linearGradient>
        <linearGradient id="roadEdge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <rect x={0} y={0} width={TRACK_WIDTH} height={TRACK_HEIGHT} fill="url(#roadFill)" />

      <rect x={2} y={0} width={4} height={TRACK_HEIGHT} fill="url(#roadEdge)" className="rail-scroll" style={{ animationDuration: `${scrollDuration * 1.4}s` }} />
      <rect x={TRACK_WIDTH - 6} y={0} width={4} height={TRACK_HEIGHT} fill="url(#roadEdge)" className="rail-scroll" style={{ animationDuration: `${scrollDuration * 1.4}s` }} />

      {Array.from({ length: LANE_COUNT - 1 }, (_, i) => (
        <line
          key={i}
          x1={(i + 1) * LANE_WIDTH}
          y1={0}
          x2={(i + 1) * LANE_WIDTH}
          y2={TRACK_HEIGHT}
          stroke="#f0f0f0"
          strokeWidth={4}
          opacity={0.85}
          strokeDasharray="18 16"
          className="lane-line"
          style={{ animationDuration: `${scrollDuration}s` }}
        />
      ))}

      {coins.map((coin) => (
        <Coin key={`coin-${coin.id}`} lane={coin.lane} y={coin.y} />
      ))}

      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} id={obstacle.id} lane={obstacle.lane} y={obstacle.y} />
      ))}

      <Player lane={playerLane} />
    </svg>
  )
}

export default GameCanvas