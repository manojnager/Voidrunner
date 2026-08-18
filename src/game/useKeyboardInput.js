import { useEffect } from 'react'

export const useKeyboardInput = (moveLeft, moveRight, status, start, restart) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        event.preventDefault()
        moveLeft()
      }
      if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        event.preventDefault()
        moveRight()
      }
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        if (status === 'ready') start()
        if (status === 'dead') restart()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveLeft, moveRight, status, start, restart])
}