# 🚴 Voidrunner

A fast-paced, endless bike-dodging browser game. Weave through oncoming traffic, collect coins, chain near-misses for score multipliers, and chase your best run.

Built with **React (Vite)** and rendered entirely with SVG and emoji — no images, no external assets, no paid APIs.

**🕹️ [Play it live](https://voidrunner-11qx.onrender.com/)**

---

## 🎮 Gameplay

- Control a cyclist riding down an endless multi-lane road.
- Dodge oncoming vehicles — cars, SUVs, buses, trucks, scooters, and trailers.
- Collect gold coins for bonus points.
- Chain coin pickups and close near-misses to build a **combo multiplier** (up to 3x).
- Difficulty ramps smoothly over time — faster traffic, tighter spawn gaps — with a fairness floor so the game never becomes physically undodgeable.
- Instant restart on death — zero friction between runs.

### Controls

| Action | Keys |
|---|---|
| Move left | `←` or `A` |
| Move right | `→` or `D` |
| Start / Restart | `Space` or `Enter` |

---

## ✨ Features

- **Endless procedural traffic** — randomized obstacle rows with a guaranteed-fair spawn floor
- **Combo & multiplier system** — near-misses and coins build a streak; getting hit resets it
- **Near-miss rewards** — grazing a vehicle in an adjacent lane triggers a "Close Call!" bonus
- **Milestone popups** — periodic in-run score celebrations
- **Coin economy** — collectible coins with live coin counter in the HUD
- **Best score tracking** — persisted locally via `localStorage`
- **Fully custom visuals** — animated running/cycling motion, spinning wheels, scrolling road, layered shadows — all built with SVG and CSS animations, no image assets

---

## 🛠️ Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/) — dev server & build tooling
- Plain CSS (no UI framework)
- SVG + emoji for all game visuals

---

## 📁 Project Structure

src/ <br>
├── components/ # Rendering layer (React components) <br>
│ ├── GameCanvas.jsx # Main SVG track renderer <br>
│ ├── Player.jsx # Cyclist rendering + animation <br>
│ ├── Obstacle.jsx # Vehicle rendering <br>
│ ├── Coin.jsx # Coin rendering <br>
│ ├── HitFlash.jsx # Death impact flash effect <br>
│ └── Popups.jsx # Floating score/combo popups <br>
├── game/ # Pure game logic (framework-agnostic) <br>
│ ├── engine.js # Core game loop / state transitions <br>
│ ├── useGameState.js # React hook bridging engine ↔ UI <br>
│ ├── useKeyboardInput.js <br>
│ ├── constants.js # Tunable game constants <br>
│ ├── difficulty.js # Speed/spawn scaling curves <br>
│ ├── spawner.js # Obstacle & coin spawn logic <br>
│ └── collision.js # Collision & near-miss detection <br>
├── App.jsx <br>
├── App.css <br>
├── index.css <br>
└── main.jsx <br>

The game logic (`src/game/`) is intentionally decoupled from React — `engine.js` is a pure function of state + time, making it easy to reason about, test, or reuse.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm

### Installation

```bash
git clone https://github.com/manojnager/Voidrunner.git
cd voidrunner
npm install
```

### Run locally

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

### Build for production

```bash
npm run build
```

Output is generated in the `dist/` folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## 🗺️ Roadmap / Ideas

- [ ] Unlockable character/bike skins based on score milestones
- [ ] Power-ups (shield, slow-motion, coin magnet)
- [ ] Daily streak tracking
- [ ] Achievements system
- [ ] Sound effects & background music
- [ ] Mobile touch controls

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Built as a solo side project to explore React game-loop architecture, SVG-based rendering, and lightweight browser game design — no game engine, no external assets.