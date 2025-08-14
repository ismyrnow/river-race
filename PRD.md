# River Race - Product Requirements Document

## Game Overview

**Title:** River Race  
**Genre:** Arcade / Endless Runner  
**Platform:** Web & Mobile  
**Framework:** KAPLAY (successor to Kaboom.js)  
**Art Style:** Pixel Art  
**Development Approach:** Vibe Coding (Iterative, experimental development)

## Game Description

River Race is a 2D third-person arcade game where players control a person in a barrel floating down an endless river. The objective is to collect coins while avoiding obstacles to achieve the highest possible score.

## Core Gameplay

### Player Character
- **Avatar:** Person sitting in a wooden barrel
- **Movement:** Left and right movement only (river current handles forward momentum)
- **Visual Style:** Pixel art sprite with simple animations

### Controls
- **Left Arrow / A Key / Touch Left:** Move barrel left
- **Right Arrow / D Key / Touch Right:** Move barrel right
- **Responsive Controls:** Smooth movement with appropriate acceleration/deceleration

### River Environment
- **Endless Scrolling:** Vertically scrolling river that generates infinitely
- **Width:** Fixed river width with clearly defined boundaries
- **Visual Elements:** 
  - Flowing water animation
  - Rocky shores on both sides
  - Varied river width sections

### Collectibles
- **Coins:** Primary collectible scattered throughout the river
- **Point Values:** 
  - Regular coins: 10 points
  - Special coins (rare): 50 points
- **Collection Feedback:** Visual and audio feedback when collected

### Obstacles
- **Rocks:** Static obstacles in the water
- **Shore/Banks:** River edges that cause collision
- **Moving Obstacles:** (Future enhancement) Logs, debris
- **Collision Consequence:** Game over on contact

### Scoring System
- **Primary Score:** Coins collected
- **Secondary Score:** Distance traveled
- **High Score:** Persistent local storage
- **Score Display:** Real-time score counter

## Technical Requirements

### Core Systems (Phase 1)
1. **User Interface System**
   - Start screen with play button
   - Game HUD (score, controls hint)
   - Game over screen with score (special note if it's a new high score) and restart option
   - Responsive design for mobile and desktop

2. **Input System**
   - Keyboard controls (Arrow keys, WASD)
   - Touch controls for mobile
   - Smooth input handling with proper acceleration

3. **Collision Detection System**
   - Player vs obstacles (rocks, shores)
   - Player vs collectibles (coins)
   - Efficient collision detection for smooth gameplay

### Rendering & Graphics
- **Pixel Art Assets:** 16x16 or 32x32 sprite resolution
- **Smooth Animations:** Player movement, water flow, coin rotation
- **Camera System:** Fixed camera following player with slight offset
- **Visual Effects:** Simple particle effects for coin collection

### Audio (Future Enhancement)
- Background music that is upbeat and exciting, banjo, river theme, with tempo increasing based on character speed/difficulty
- Coin collection sound effects
- Collision/crash sound effects

### Performance
- **Target FPS:** 60 FPS on all platforms
- **Mobile Optimization:** Touch-friendly controls, appropriate scaling
- **Asset Loading:** Efficient sprite loading and management

## User Experience

### Onboarding
- **First Time:** Simple tutorial overlay showing controls
- **Visual Cues:** Clear indication of collectibles vs obstacles
- **Progressive Difficulty:** Gradual increase in obstacle density and character/river speed

### Accessibility
- **Visual:** High contrast between game elements
- **Controls:** Large touch targets for mobile
- **Feedback:** Clear visual/audio feedback for all actions

### Monetization (Future)
- **Ad Integration:** Optional video ads for continues
- **Cosmetics:** Different barrel designs, character customization

## Development Phases

### Phase 1: Core Mechanics (Current Focus)
- [x] Project setup with KAPLAY
- [x] Basic UI system (start screen, HUD, game over)
- [x] Basic river environment (player character visible)
- [x] Player movement controls (left/right)
- [x] Coin generation
- [x] Obstacle generation

### Phase 2: Gameplay Loop
- [x] Collision detection system
- [x] Coin collection system
- [x] Scoring system
- [x] Game over conditions

### Phase 3: Polish & Content
- [ ] Pixel art assets
- [ ] Animations and visual effects
- [ ] Audio implementation
- [ ] Mobile optimization

### Phase 4: Enhancement
- [ ] Power-ups
- [ ] Varied obstacles
- [ ] Progressive difficulty
- [ ] Local leaderboards

## Success Metrics

### Engagement
- **Session Length:** Average 2-3 minutes per session
- **Retention:** Players return within 24 hours
- **Replay Rate:** Players restart immediately after game over

### Technical
- **Performance:** Consistent 60 FPS
- **Load Time:** < 3 seconds initial load
- **Crash Rate:** < 1%

## Risk Assessment

### Technical Risks
- **Mobile Performance:** Ensure smooth performance on lower-end devices
- **Touch Controls:** Responsive and intuitive mobile controls
- **Collision Accuracy:** Precise collision detection without false positives

### Design Risks
- **Difficulty Curve:** Avoid too easy or too difficult progression
- **Visual Clarity:** Ensure obstacles and collectibles are clearly distinguishable
- **Control Responsiveness:** Balance between realistic barrel physics and responsive controls

## Future Considerations

### Potential Features
- **Multiplayer:** Race against other players
- **Customization:** Barrel and character customization
- **Power-ups:** Temporary abilities (shield, magnet, speed boost)
- **Environmental Variety:** Different river themes (jungle, mountain, city)
- **Seasonal Events:** Special collectibles and themes

### Platform Expansion
- **PWA:** Progressive Web App for mobile installation
- **App Stores:** Native mobile app distribution
- **Desktop:** Electron app for desktop distribution

---

*This PRD will evolve as we vibe code and discover what works best for the game. The focus is on rapid iteration and finding the fun.*
