# River Race

A 2D arcade game built with KAPLAY where you control a person in a barrel floating down an endless river.

## Features

- **Endless Gameplay**: Navigate down an infinite river
- **Simple Controls**: Left/Right movement with keyboard or touch
- **Collision System**: Avoid rocks and shores, collect coins
- **Cross-Platform**: Works on web and mobile devices
- **Pixel Art Style**: Retro aesthetic with smooth animations

## Controls

### Desktop
- **Arrow Keys** or **A/D** keys to move left and right
- **Space** to start the game
- **Escape** to return to menu (from game over screen)

### Mobile
- **Touch left side** of screen to move left
- **Touch right side** of screen to move right

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd river-race
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Development

### Project Structure
```
src/
├── main.js        # Main game initialization
├── ui.js          # User interface system
├── controls.js    # Input handling
├── collision.js   # Collision detection
└── gameObjects.js # Game entity management
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Game Mechanics

### Scoring
- **Coins**: 10 points each
- **Distance**: Passive scoring over time
- **High Score**: Saved locally

### Obstacles
- **Rocks**: Scattered throughout the river
- **Shore/Banks**: River boundaries on left and right

### Difficulty
- Progressive increase in obstacle density
- Faster river flow over time

## Technology Stack

- **KAPLAY**: 2D game framework (successor to Kaboom.js)
- **Vite**: Build tool and dev server
- **HTML5 Canvas**: Rendering
- **Web APIs**: Touch events, local storage

## Contributing

This is a vibe coding project! Feel free to experiment and add features:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Roadmap

- [ ] Pixel art sprites
- [ ] Sound effects and music
- [ ] Power-ups
- [ ] Multiple environments
- [ ] Leaderboards
- [ ] Multiplayer

## License

MIT License - see LICENSE file for details
