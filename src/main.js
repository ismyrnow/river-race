import kaplay from "kaplay";

console.log("Starting River Race...");

// Initialize KAPLAY (successor to Kaboom)
const k = kaplay({
  width: 800,
  height: 600,
  scale: 1,
  crisp: true,
  background: [135, 206, 235], // Sky blue background
});

console.log("KAPLAY initialized successfully");

// Import game modules one by one
import { initUI } from "./ui.js";
// import { initControls } from "./controls.js"; // Now handled within game scene
import { initCollisions } from "./collision.js";
// import { initGameObjects } from "./gameObjects.js"; // Still broken - investigating

// Game state
let gameState = {
  score: 0,
  isPlaying: false,
  highScore: parseInt(localStorage.getItem("riverRaceHighScore")) || 0,
};

// Initialize systems
function init() {
  console.log("Initializing game...");

  try {
    // Load sprites (placeholder colored rectangles for now)
    loadSprites();

    console.log("Initializing UI...");
    initUI(k, gameState);

    // console.log("Initializing controls...");
    // initControls(k); // Now handled within game scene

    console.log("Initializing collisions...");
    initCollisions(k, gameState);

    // console.log("Initializing game objects...");
    // initGameObjects(k); // Still broken

    console.log("Going to menu scene...");
    k.go("menu");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

// Load sprites
function loadSprites() {
  console.log("Loading game sprites...");

  // Player barrel sprite
  k.loadSprite("barrel", "/sprites/barrel.png")
    .then(() => {
      console.log("✅ Barrel sprite loaded successfully");
      // Log sprite dimensions for debugging
      const barrelSprite = k.getSprite("barrel");
      if (barrelSprite) {
        console.log(
          "Barrel sprite dimensions:",
          barrelSprite.width,
          "x",
          barrelSprite.height
        );
      }
    })
    .catch(() => {
      console.log("❌ Failed to load barrel sprite, using fallback");
      // Create fallback sprite
      k.loadSprite(
        "barrel",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      );
    });

  // Coin sprite with animation frames
  k.loadSprite("coin", "/sprites/coin.png", {
    sliceX: 8, // 8 frames horizontally
    sliceY: 1, // 1 row
    anims: {
      spin: {
        from: 0,
        to: 7,
        speed: 10, // Animation speed (frames per second)
        loop: true,
      },
    },
  })
    .then(() => {
      console.log("✅ Animated coin sprite loaded successfully (8 frames)");
    })
    .catch(() => {
      console.log("❌ Failed to load coin sprite, using fallback");
    });

  // Rock sprite
  k.loadSprite("rock", "/sprites/rock.png")
    .then(() => {
      console.log("✅ Rock sprite loaded successfully");
    })
    .catch(() => {
      console.log("❌ Failed to load rock sprite, using fallback");
    });

  // Water tile sprite with 2-frame animation
  k.loadSprite("water_tile", "/sprites/water_tile.png", {
    sliceX: 1, // 1 frame horizontally (32px wide)
    sliceY: 2, // 2 frames vertically (32px each, total 64px height)
    anims: {
      flow: {
        from: 0,
        to: 1,
        speed: 3, // Slow animation for gentle water flow
        loop: true,
      },
    },
  })
    .then(() => {
      console.log(
        "✅ Animated water tile sprite loaded successfully (2 frames, 32x32 each)"
      );
    })
    .catch(() => {
      console.log("❌ Failed to load water tile sprite, using fallback");
    });
}

// Export kaboom instance and game state for other modules
window.k = k;
window.gameState = gameState;

// Start the game
init();
