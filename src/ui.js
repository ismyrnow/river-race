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

    // Ensure game is marked as playing
    gameState.isPlaying = true;
    console.log("Game state set to playing:", gameState.isPlaying);

    // River background - solid color
    k.add([
      k.rect(k.width(), k.height()),
      k.color(155, 212, 195), // Color #9bd4c3
      k.pos(0, 0),
    ]);

    // River banks (shores) with grass tiles - OPTIMIZED
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
      k.sprite("barrel"),
      k.pos(k.width() / 2, k.height() - 100),
      k.anchor("center"),
      k.scale(0.2), // Scale down to 40% of original size
      k.area(), // Auto-calculates collision area from sprite
      "player",
    ]);
    console.log("Player created successfully with barrel sprite");

    // Obstacle generation and downstream movement system
    console.log("Initializing obstacle generation");

    const riverSpeed = 150; // Speed objects move downstream
    const riverWidth = k.width() - bankWidth * 2;
    let obstacleTimer = 0;
    let coinTimer = 0;

    // Spawn obstacles (rocks)
    k.onUpdate(() => {
      obstacleTimer += k.dt();
      coinTimer += k.dt();

      // Spawn rocks every 2-3 seconds
      if (obstacleTimer > k.rand(2, 3)) {
        obstacleTimer = 0;

        // Random position within river bounds
        const x = bankWidth + k.rand(20, riverWidth - 40);
        const y = -50; // Start above screen

        k.add([
          k.sprite("biome", { frame: 41 }), // Column 6, Row 5 from biome tileset
          k.pos(x, y),
          k.anchor("center"),
          k.scale(2.0), // Scale biome tile appropriately (16x16 -> 32x32)
          k.area(),
          k.move(k.DOWN, riverSpeed),
          "rock",
          "obstacle",
        ]);

        console.log("Spawned rock at", x, y);
      }

      // Spawn coins every 1-2 seconds
      if (coinTimer > k.rand(1, 2)) {
        coinTimer = 0;

        // Random position within river bounds
        const x = bankWidth + k.rand(20, riverWidth - 20);
        const y = -30; // Start above screen

        k.add([
          k.sprite("coin", { anim: "spin" }),
          k.pos(x, y),
          k.anchor("center"),
          k.scale(0.5), // Scale coin sprite appropriately
          k.area(),
          k.move(k.DOWN, riverSpeed),
          "coin",
          "collectible",
        ]);

        console.log("Spawned coin at", x, y);
      }
    });

    // Clean up objects that have moved off screen
    k.onUpdate("obstacle", (obj) => {
      if (obj.pos.y > k.height() + 50) {
        k.destroy(obj);
      }
    });

    k.onUpdate("collectible", (obj) => {
      if (obj.pos.y > k.height() + 50) {
        k.destroy(obj);
      }
    });

    // Add some visual water flow effects
    let flowTimer = 0;
    k.onUpdate(() => {
      flowTimer += k.dt();

      // Spawn water flow indicators every 0.5 seconds
      if (flowTimer > 0.5) {
        flowTimer = 0;

        // Create small flow indicators across the river
        for (let i = 0; i < 3; i++) {
          const x = bankWidth + k.rand(10, riverWidth - 10);
          const y = -10;

          k.add([
            k.rect(4, 8),
            k.pos(x, y),
            k.anchor("center"),
            k.color(100, 150, 255), // Light blue flow indicator
            k.opacity(0.3),
            k.move(k.DOWN, riverSpeed * 1.2),
            "flow",
          ]);
        }
      }
    });

    // Clean up flow indicators
    k.onUpdate("flow", (flow) => {
      if (flow.pos.y > k.height() + 20) {
        k.destroy(flow);
      }
    });

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
      // Use simple fixed boundaries that work reliably
      const barrelRadius = 25; // Reasonable estimate for scaled barrel
      const minX = bankWidth + barrelRadius; // Shore width + barrel radius
      const maxX = k.width() - bankWidth - barrelRadius;

      // Debug: Log boundary info once
      if (!player.boundariesLogged) {
        console.log(
          "Boundary setup - bankWidth:",
          bankWidth,
          "minX:",
          minX,
          "maxX:",
          maxX,
          "screenWidth:",
          k.width()
        );
        player.boundariesLogged = true;
      }

      if (player.pos.x < minX) {
        player.pos.x = minX;
        console.log("Hit left boundary at x:", minX);
      }
      if (player.pos.x > maxX) {
        player.pos.x = maxX;
        console.log("Hit right boundary at x:", maxX);
      }
    });

    // Initialize collision detection within the game scene
    console.log("Activating collision detection in game scene");

    // Player collision with shore/banks
    k.onCollide("player", "shore", (player, shore) => {
      console.log("Player hit shore!");
      gameOver(k, gameState);
    });

    // Player collision with rocks
    k.onCollide("player", "rock", (player, rock) => {
      console.log("Player hit rock!");
      gameOver(k, gameState);
    });

    // Player collision with coins
    k.onCollide("player", "coin", (player, coin) => {
      console.log("Player collected coin!");
      collectCoin(k, gameState, coin);
    });

    // Collision helper functions
    function gameOver(k, gameState) {
      if (!gameState.isPlaying) return; // Prevent multiple game overs

      console.log("Game Over triggered!");
      gameState.isPlaying = false;

      // Add visual feedback
      k.shake(10);

      // Transition to game over screen after brief delay
      setTimeout(() => {
        k.go("gameOver");
      }, 1000);
    }

    function collectCoin(k, gameState, coin) {
      // Add to score
      gameState.score += 10;
      console.log("Score increased to:", gameState.score);

      // Visual feedback - simple scale animation
      coin.scaleTo(1.5);
      coin.opacity = 0.7;

      // Create particle effect
      createCoinCollectEffect(k, coin.pos.x, coin.pos.y);

      // Remove coin after brief animation
      setTimeout(() => {
        if (coin && coin.exists()) {
          k.destroy(coin);
        }
      }, 100);
    }

    function createCoinCollectEffect(k, x, y) {
      // Create simple particle effect for coin collection
      for (let i = 0; i < 5; i++) {
        const particle = k.add([
          k.circle(3),
          k.pos(x + k.rand(-10, 10), y + k.rand(-10, 10)),
          k.color(255, 255, 0),
          k.opacity(1),
          k.lifespan(0.5),
        ]);

        // Animate particle with physics
        particle.vel = k.vec2(k.rand(-50, 50), k.rand(-50, -20));

        k.onUpdate(() => {
          if (particle.exists()) {
            particle.move(particle.vel);
            particle.opacity -= k.dt() * 2;
            particle.vel.y += 100 * k.dt(); // Gravity
          }
        });
      }
    }

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

    // High score logic
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
    } else {
      // Only show best score if it's NOT a new high score
      k.add([
        k.text(`Best: ${gameState.highScore}`, {
          size: 24,
        }),
        k.pos(k.width() / 2, k.height() / 2 + 40),
        k.anchor("center"),
        k.color(255, 215, 0), // Gold color for best score
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
