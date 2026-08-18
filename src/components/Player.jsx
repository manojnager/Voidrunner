import { PLAYER_Y, PLAYER_RADIUS, GLIDE_DURATION_MS, laneCenterX } from '../game/constants'

const Player = ({ lane }) => {
  const cx = laneCenterX(lane)
  const size = PLAYER_RADIUS * 3.2

  return (
    <g
      className="player-bob"
      style={{
        transition: `transform ${GLIDE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transform: `translateX(${cx}px)`,
      }}
    >
      <ellipse cx={0} cy={PLAYER_Y + size * 0.32} rx={size * 0.32} ry={5} fill="#000000" opacity={0.35} />
      <text
        x={0}
        y={PLAYER_Y}
        fontSize={size}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.45))', transform: 'rotate(90deg)', transformOrigin: `0px ${PLAYER_Y}px` }}
      >
        🚴
      </text>
    </g>
  )
}

export default Player