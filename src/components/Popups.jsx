import { useEffect, useState } from 'react'

const Popups = ({ popups }) => {
  const [visible, setVisible] = useState([])

  useEffect(() => {
    if (!popups || popups.length === 0) return
    setVisible((prev) => [...prev, ...popups])
    const timer = setTimeout(() => {
      setVisible((prev) => prev.filter((p) => !popups.some((np) => np.id === p.id)))
    }, 900)
    return () => clearTimeout(timer)
  }, [popups])

  return (
    <div className="popup-layer">
      {visible.map((p) => (
        <div key={p.id} className={`popup popup-${p.kind}`}>
          {p.text}
        </div>
      ))}
    </div>
  )
}

export default Popups