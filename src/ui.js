// UI System - Handles all user interface elements
export function initUI(k, gameState) {
  console.log("Initializing UI system...");

  try {
    // Main Menu Scene
    k.scene("menu", () => {
      console.log("Menu scene loaded");

      // Clear any existing objects
      k.destroyAll();

      // Background
      k.add([k.rect(k.width(), k.height()), k.color(20, 50, 80), k.pos(0, 0)]);

      // Title
      k.add([
        k.text("RIVER RACE", {
          size: 48,
        }),
        k.pos(k.width() / 2, k.height() / 3),
        k.anchor("center"),
        k.color(255, 255, 255),
      ]);

      // Subtitle
      k.add([
        k.text("Navigate the endless river!", {
          size: 24,
        }),
        k.pos(k.width() / 2, k.height() / 3 + 60),
        k.anchor("center"),
        k.color(200, 200, 200),
      ]);

      // Play button
      const playBtn = k.add([
        k.rect(200, 60),
        k.pos(k.width() / 2, k.height() / 2 + 50),
        k.anchor("center"),
        k.color(50, 150, 50),
        k.area(),
        "playButton",
      ]);

      k.add([
        k.text("PLAY", {
          size: 32,
        }),
        k.pos(k.width() / 2, k.height() / 2 + 50),
        k.anchor("center"),
        k.color(255, 255, 255),
      ]);

      // High score display
      k.add([
        k.text(`High Score: ${gameState.highScore}`, {
          size: 20,
        }),
        k.pos(k.width() / 2, k.height() - 100),
        k.anchor("center"),
        k.color(255, 255, 0),
      ]);

      // Controls info
      k.add([
        k.text("Use ARROW KEYS or A/D to move", {
          size: 16,
        }),
        k.pos(k.width() / 2, k.height() - 60),
        k.anchor("center"),
        k.color(180, 180, 180),
      ]);

      k.add([
        k.text("Touch LEFT/RIGHT on mobile", {
          size: 16,
        }),
        k.pos(k.width() / 2, k.height() - 40),
        k.anchor("center"),
        k.color(180, 180, 180),
      ]);

      // Play button interaction
      playBtn.onClick(() => {
        console.log("Play button clicked");
        gameState.isPlaying = true;
        gameState.score = 0;
        k.go("game");
      });

      // Keyboard shortcut to start
      k.onKeyPress("space", () => {
        console.log("Space key pressed");
        gameState.isPlaying = true;
        gameState.score = 0;
        k.go("game");
      });

      console.log("Menu scene setup complete");
    });

    console.log("UI system initialized successfully");
  } catch (error) {
    console.error("Error initializing UI:", error);
  }

  // Game Scene
  k.scene("game", () => {
    console.log("Game scene loaded");

    // River background
    k.add([
      k.rect(k.width(), k.height()),
      k.color(65, 105, 225), // Royal blue for water
      k.pos(0, 0),
    ]);

    // River banks (shores)
    const bankWidth = 100;

    // Left bank
    k.add([
      k.rect(bankWidth, k.height()),
      k.pos(0, 0),
      k.color(139, 69, 19), // Brown for shore
      k.area(),
      "shore",
    ]);

    // Right bank
    k.add([
      k.rect(bankWidth, k.height()),
      k.pos(k.width() - bankWidth, 0),
      k.color(139, 69, 19),
      k.area(),
      "shore",
    ]);

    // Create player barrel
    console.log("Creating player in game scene");
    const player = k.add([
      k.rect(40, 30),
      k.pos(k.width() / 2, k.height() - 100),
      k.anchor("center"),
      k.color(139, 69, 19), // Brown barrel color
      k.area(),
      "player",
    ]);
    console.log("Player created successfully");

    // Initialize controls within the game scene
    console.log("Initializing controls in game scene");
    let leftPressed = false;
    let rightPressed = false;

    // Keyboard controls
    k.onKeyDown("left", () => {
      leftPressed = true;
      console.log("Left key pressed");
    });
    k.onKeyDown("right", () => {
      rightPressed = true;
      console.log("Right key pressed");
    });
    k.onKeyDown("a", () => {
      leftPressed = true;
      console.log("A key pressed");
    });
    k.onKeyDown("d", () => {
      rightPressed = true;
      console.log("D key pressed");
    });

    k.onKeyRelease("left", () => {
      leftPressed = false;
      console.log("Left key released");
    });
    k.onKeyRelease("right", () => {
      rightPressed = false;
      console.log("Right key released");
    });
    k.onKeyRelease("a", () => {
      leftPressed = false;
      console.log("A key released");
    });
    k.onKeyRelease("d", () => {
      rightPressed = false;
      console.log("D key released");
    });

    // Movement system
    k.onUpdate("player", (player) => {
      const moveSpeed = 300; // pixels per second

      if (leftPressed) {
        player.move(-moveSpeed, 0);
        console.log("Moving left, player pos:", player.pos.x);
      }
      if (rightPressed) {
        player.move(moveSpeed, 0);
        console.log("Moving right, player pos:", player.pos.x);
      }

      // Keep player within river bounds (between shores)
      const bankWidth = 100;
      const minX = bankWidth + 20; // Shore width + buffer
      const maxX = k.width() - bankWidth - 20;

      if (player.pos.x < minX) {
        player.pos.x = minX;
        console.log("Hit left boundary");
      }
      if (player.pos.x > maxX) {
        player.pos.x = maxX;
        console.log("Hit right boundary");
      }
    });

    // Game HUD
    createGameHUD(k, gameState);

    // Mobile touch controls
    createTouchControls(k);
  });

  // Game Over Scene
  k.scene("gameOver", () => {
    // Semi-transparent overlay
    k.add([
      k.rect(k.width(), k.height()),
      k.color(0, 0, 0),
      k.opacity(0.7),
      k.pos(0, 0),
    ]);

    // Game Over text
    k.add([
      k.text("GAME OVER", {
        size: 48,
      }),
      k.pos(k.width() / 2, k.height() / 3),
      k.anchor("center"),
      k.color(255, 100, 100),
    ]);

    // Final score
    k.add([
      k.text(`Score: ${gameState.score}`, {
        size: 32,
      }),
      k.pos(k.width() / 2, k.height() / 2),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    // High score
    const isNewHighScore = gameState.score > gameState.highScore;
    if (isNewHighScore) {
      gameState.highScore = gameState.score;
      localStorage.setItem(
        "riverRaceHighScore",
        gameState.highScore.toString()
      );

      k.add([
        k.text("NEW HIGH SCORE!", {
          size: 24,
        }),
        k.pos(k.width() / 2, k.height() / 2 + 40),
        k.anchor("center"),
        k.color(255, 255, 0),
      ]);
    }

    // Restart button
    const restartBtn = k.add([
      k.rect(200, 60),
      k.pos(k.width() / 2, k.height() / 2 + 100),
      k.anchor("center"),
      k.color(50, 150, 50),
      k.area(),
      "restartButton",
    ]);

    k.add([
      k.text("PLAY AGAIN", {
        size: 24,
      }),
      k.pos(k.width() / 2, k.height() / 2 + 100),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    // Menu button
    const menuBtn = k.add([
      k.rect(200, 60),
      k.pos(k.width() / 2, k.height() / 2 + 180),
      k.anchor("center"),
      k.color(100, 100, 150),
      k.area(),
      "menuButton",
    ]);

    k.add([
      k.text("MAIN MENU", {
        size: 24,
      }),
      k.pos(k.width() / 2, k.height() / 2 + 180),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    // Button interactions
    restartBtn.onClick(() => {
      gameState.isPlaying = true;
      gameState.score = 0;
      k.go("game");
    });

    menuBtn.onClick(() => {
      gameState.isPlaying = false;
      k.go("menu");
    });

    // Keyboard shortcuts
    k.onKeyPress("space", () => {
      gameState.isPlaying = true;
      gameState.score = 0;
      k.go("game");
    });

    k.onKeyPress("escape", () => {
      gameState.isPlaying = false;
      k.go("menu");
    });
  });
}

// Create game HUD elements
function createGameHUD(k, gameState) {
  // Score display
  const scoreText = k.add([
    k.text("Score: 0", {
      size: 24,
    }),
    k.pos(20, 20),
    k.color(255, 255, 255),
    k.fixed(),
    "scoreText",
  ]);

  // Update score display
  k.onUpdate("scoreText", (scoreDisplay) => {
    scoreDisplay.text = `Score: ${gameState.score}`;
  });

  // High score display (top right)
  k.add([
    k.text(`Best: ${gameState.highScore}`, {
      size: 20,
    }),
    k.pos(k.width() - 20, 20),
    k.anchor("topright"),
    k.color(255, 255, 0),
    k.fixed(),
  ]);
}

// Create mobile touch controls
function createTouchControls(k) {
  // Only show on mobile/touch devices
  if ("ontouchstart" in window) {
    // Left touch area
    const leftTouch = k.add([
      k.rect(k.width() / 2, k.height()),
      k.pos(0, 0),
      k.opacity(0), // Invisible but clickable
      k.area(),
      k.fixed(),
      "leftTouch",
    ]);

    // Right touch area
    const rightTouch = k.add([
      k.rect(k.width() / 2, k.height()),
      k.pos(k.width() / 2, 0),
      k.opacity(0),
      k.area(),
      k.fixed(),
      "rightTouch",
    ]);

    // Visual indicators (subtle)
    k.add([
      k.text("L", {
        size: 32,
      }),
      k.pos(k.width() / 4, k.height() - 50),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.opacity(0.3),
      k.fixed(),
    ]);

    k.add([
      k.text("R", {
        size: 32,
      }),
      k.pos((3 * k.width()) / 4, k.height() - 50),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.opacity(0.3),
      k.fixed(),
    ]);
  }
}
