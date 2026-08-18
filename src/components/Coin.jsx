import { laneCenterX } from '../game/constants'

const Coin = ({ lane, y }) => {
  const cx = laneCenterX(lane)

  return (
    <g className="coin-spin" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
      <ellipse cx={cx} cy={y + 14} rx={9} ry={3} fill="#000000" opacity={0.25} />
      <text x={cx} y={y} fontSize={26} textAnchor="middle" dominantBaseline="central">
        🪙
      </text>
    </g>
  )
}

export default Coin