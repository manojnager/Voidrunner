import { useState, useRef, useCallback, useEffect } from 'react'
import { createInitialState, updateGame } from './engine'
import { resetSpawnerIds } from './spawner'
import { LANE_COUNT } from './constants'

export const useGameState = () => {
  const [state, setState] = useState(createInitialState)
  const frameRef = useRef(null)
  const lastTimeRef = useRef(null)

  const tick = useCallback((time) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
    }
    const deltaMs = Math.min(time - lastTimeRef.current, 48)
    lastTimeRef.current = time

    setState((prev) => updateGame(prev, deltaMs))
    frameRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (state.status === 'running') {
      lastTimeRef.current = null
      frameRef.current = requestAnimationFrame(tick)
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [state.status, tick])

  const start = useCallback(() => {
    resetSpawnerIds()
    setState({ ...createInitialState(), status: 'running' })
  }, [])

  const restart = useCallback(() => {
    resetSpawnerIds()
    setState({ ...createInitialState(), status: 'running' })
  }, [])

  const moveLeft = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'running') return prev
      return { ...prev, playerLane: Math.max(0, prev.playerLane - 1) }
    })
  }, [])

  const moveRight = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'running') return prev
      return { ...prev, playerLane: Math.min(LANE_COUNT - 1, prev.playerLane + 1) }
    })
  }, [])

  return { state, start, restart, moveLeft, moveRight }
}