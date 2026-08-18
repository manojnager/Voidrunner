import { useGameState } from './game/useGameState'
import { useKeyboardInput } from './game/useKeyboardInput'
import GameCanvas from './components/GameCanvas'
import HitFlash from './components/HitFlash'
import Popups from './components/Popups'
import './App.css'

function App() {
  const { state, start, restart, moveLeft, moveRight } = useGameState()
  useKeyboardInput(moveLeft, moveRight, state.status, start, restart)

  const isDead = state.status === 'dead'
  const best = Math.max(state.score, Number(localStorage.getItem('voidrunner_best') || 0))

  if (isDead) {
    localStorage.setItem('voidrunner_best', String(Math.floor(best)))
  }

  return (
    <div className={`app ${isDead ? 'shake' : ''}`} key={state.status === 'running' ? 'run' : 'idle'}>
      <div className="hud-bar">
        <div className="hud-title">VOIDRUNNER</div>
        <div className="hud-card">
          <div className="hud-label">SCORE</div>
          <div className="hud-value">{Math.floor(state.score)}</div>
        </div>
        <div className="hud-card">
          <div className="hud-label">BEST</div>
          <div className="hud-value">{Math.floor(best)}</div>
        </div>
        <div className="hud-card">
          <div className="hud-label">COINS</div>
          <div className="hud-value">{state.coinsCollected}</div>
        </div>
        {state.multiplier > 1 && (
          <div className="hud-card hud-combo">
            <div className="hud-label">COMBO</div>
            <div className="hud-value">{state.multiplier}x</div>
          </div>
        )}
      </div>

      <Popups popups={state.popups} />
      <div className="game-stage">
          <GameCanvas playerLane={state.playerLane} obstacles={state.obstacles} coins={state.coins} speed={state.speed || 220} />
      </div>

      <HitFlash active={isDead} />

      {state.status === 'ready' && (
        <div className="overlay">
          <div className="title">Ready to Run?</div>
          <button className="start-button" onClick={start}>Start Game</button>
          <div className="hint">Arrow Keys / A-D to move</div>
        </div>
      )}

      {isDead && (
        <div className="overlay">
          <div className="death-label">RUN OVER</div>
          <div className="score-line">Score: {Math.floor(state.score)}</div>
          <button className="start-button" onClick={restart}>Restart</button>
          <div className="hint">Space / Enter to restart instantly</div>
        </div>
      )}
    </div>
  )
}

export default App