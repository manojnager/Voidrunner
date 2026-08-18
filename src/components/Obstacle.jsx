import { OBSTACLE_WIDTH, laneCenterX } from '../game/constants'

const VEHICLES = ['🚗', '🚙', '🚌', '🚚', '🛵', '🚛', '🚕', '🏎️']

const Obstacle = ({ lane, y, id }) => {
  const cx = laneCenterX(lane)
  const emoji = VEHICLES[id % VEHICLES.length]
    const size = OBSTACLE_WIDTH * 0.86

  return (
    <g>
      <ellipse cx={cx} cy={y + size * 0.55} rx={size * 0.4} ry={6} fill="#000000" opacity={0.35} />
      <text
        x={cx}
        y={y + size * 0.5}
        fontSize={size}
        textAnchor="middle"
        dominantBaseline="central"
                style={{ filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.4))', transform: `rotate(-90deg)`, transformOrigin: `${cx}px ${y + size * 0.5}px` }}
      >
        {emoji}
      </text>
    </g>
  )
}

export default Obstacle