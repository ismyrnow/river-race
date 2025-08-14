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
      k.z(-10), // Ensure river background is behind everything
    ]);

    // River banks (shores) with subtle parallax movement
    const bankWidth = 100;
    const riverSpeed = 150; // Speed objects move downstream
    const bankParallaxSpeed = 20; // Very slow parallax movement

    // Static bank backgrounds (never move - ensure full coverage)
    k.add([
      k.rect(bankWidth, k.height()),
      k.pos(0, 0),
      k.color(192, 212, 112), // RGB(192, 212, 112) - light green
      k.z(-6), // Just above river, below moving banks
    ]);

    k.add([
      k.rect(bankWidth, k.height()),
      k.pos(k.width() - bankWidth, 0),
      k.color(192, 212, 112), // RGB(192, 212, 112) - light green
      k.z(-6), // Just above river, below moving banks
    ]);

    // Left bank - visual background with subtle movement (for parallax effect only)
    const leftBank = k.add([
      k.rect(bankWidth, k.height() + 100), // Slightly taller for movement
      k.pos(0, -50),
      k.color(192, 212, 112), // RGB(192, 212, 112) - light green
      k.move(k.DOWN, bankParallaxSpeed),
      k.z(-5), // Above static banks
      k.opacity(0.3), // Semi-transparent for subtle parallax
      "bank_parallax",
    ]);

    // Right bank - visual background with subtle movement (for parallax effect only)
    const rightBank = k.add([
      k.rect(bankWidth, k.height() + 100), // Slightly taller for movement
      k.pos(k.width() - bankWidth, -50),
      k.color(192, 212, 112), // RGB(192, 212, 112) - light green
      k.move(k.DOWN, bankParallaxSpeed),
      k.z(-5), // Above static banks
      k.opacity(0.3), // Semi-transparent for subtle parallax
      "bank_parallax",
    ]);

    // Add scrolling grass decoration tiles on banks - declare sizes first
    const grassTileSize = 16;
    const grassScale = 2; // Scale grass tiles to 32x32
    const scaledGrassSize = grassTileSize * grassScale;

    // Create scrolling grass system
    const bankScrollSpeed = riverSpeed * 0.8; // Slightly slower than river objects

    // Add brown edges to riverbanks
    const edgeWidth = 32; // Width of brown edge (32x32 rectangles to match 2x scaled tiles)

    // Left bank edge - using grass frame 13 - animated and tiled vertically
    // Create a column of edge tiles that scroll like the grass
    function createLeftBankEdgeRow(yPos) {
      k.add([
        k.sprite("grass", { frame: 13 }),
        k.pos(bankWidth - edgeWidth / 2 + scaledGrassSize, yPos), // Position one column to the right
        k.anchor("center"),
        k.scale(2), // Match the grass scale (2x)
        k.move(k.DOWN, bankScrollSpeed),
        k.z(-1), // Above grass (which is at z(-2))
        "scrolling_bank_edge",
      ]);
    }

    // Right bank edge - using grass frame 11 - animated and tiled vertically
    // Create a column of edge tiles that scroll like the grass
    function createRightBankEdgeRow(yPos) {
      k.add([
        k.sprite("grass", { frame: 11 }),
        k.pos(k.width() - bankWidth - edgeWidth / 2, yPos), // Position one tile left of current
        k.anchor("center"),
        k.scale(2), // Match the grass scale (2x)
        k.move(k.DOWN, bankScrollSpeed),
        k.z(-1), // Above grass (which is at z(-2))
        "scrolling_bank_edge",
      ]);
    }

    // Initial edge tile placement - fill the screen
    for (
      let y = -scaledGrassSize;
      y < k.height() + scaledGrassSize;
      y += scaledGrassSize
    ) {
      createLeftBankEdgeRow(y);
      createRightBankEdgeRow(y);
    }

    // Fixed collision areas for shores (these don't move and are invisible)
    k.add([
      k.rect(bankWidth + edgeWidth, k.height()), // Extended to cover left edge tiles
      k.pos(0, 0), // Starts at left edge to cover edge area
      k.area(),
      k.opacity(0), // Make collision areas invisible
      k.z(10), // Place collision areas above everything else but invisible
      "shore",
    ]);

    k.add([
      k.rect(bankWidth + edgeWidth, k.height()), // Extended to cover edge tiles
      k.pos(k.width() - bankWidth - edgeWidth, 0), // Moved left to cover edge area
      k.area(),
      k.opacity(0), // Make collision areas invisible
      k.z(10), // Place collision areas above everything else but invisible
      "shore",
    ]);

    // Reset bank positions when they scroll too far
    k.onUpdate("bank_parallax", (bank) => {
      if (bank.pos.y > 50) {
        // Back to original timing
        bank.pos.y = -50; // Back to original position
      }
    });

    // Add scrolling grass decoration tiles on banks
    // Use only row 7, column 1: (7-1) * 11 + (1-1) = 6 * 11 + 0 = 66
    const grassFrame = 66;

    // Function to create a row of grass at a given Y position
    function createGrassRow(yPos) {
      // Left bank grass - proper grid placement
      const leftBankTilesX = Math.floor(bankWidth / scaledGrassSize);
      for (let x = 0; x < leftBankTilesX; x++) {
        if (k.rand() < 0.4) {
          // 40% chance for each tile
          k.add([
            k.sprite("grass", { frame: 66 }),
            k.pos(
              x * scaledGrassSize + scaledGrassSize / 2, // Center in grid cell
              yPos
            ),
            k.anchor("center"),
            k.scale(grassScale),
            k.move(k.DOWN, bankScrollSpeed),
            k.z(-2), // Ensure grass is below HUD elements
            "scrolling_grass",
          ]);
        }
      }

      // Right bank grass - proper grid placement, ensuring it stays within bank bounds
      const rightBankStartX = k.width() - bankWidth;
      for (let x = 0; x < leftBankTilesX; x++) {
        if (k.rand() < 0.4) {
          // 40% chance for each tile
          const grassX =
            rightBankStartX + x * scaledGrassSize + scaledGrassSize / 2;
          // Ensure grass stays within the right bank boundaries
          if (grassX >= rightBankStartX + 16 && grassX <= k.width() - 16) {
            k.add([
              k.sprite("grass", { frame: 66 }),
              k.pos(grassX, yPos),
              k.anchor("center"),
              k.scale(grassScale),
              k.move(k.DOWN, bankScrollSpeed),
              k.z(-2), // Ensure grass is below HUD elements
              "scrolling_grass",
            ]);
          }
        }
      }
    }

    // Initial grass placement - fill the screen
    for (
      let y = -scaledGrassSize;
      y < k.height() + scaledGrassSize;
      y += scaledGrassSize
    ) {
      createGrassRow(y);
    }

    // Continuously spawn new grass rows at the top
    let grassSpawnTimer = 0;
    const grassSpawnInterval = scaledGrassSize / bankScrollSpeed; // Time for one tile height

    k.onUpdate(() => {
      grassSpawnTimer += k.dt();

      if (grassSpawnTimer >= grassSpawnInterval) {
        grassSpawnTimer = 0;
        createGrassRow(-scaledGrassSize);
        createLeftBankEdgeRow(-scaledGrassSize); // Spawn new left edge tile with grass
        createRightBankEdgeRow(-scaledGrassSize); // Spawn new right edge tile with grass
      }
    });

    // Clean up grass that has scrolled off screen
    k.onUpdate("scrolling_grass", (grass) => {
      if (grass.pos.y > k.height() + scaledGrassSize) {
        k.destroy(grass);
      }
    });

    // Clean up bank edge tiles that have scrolled off screen
    k.onUpdate("scrolling_bank_edge", (edge) => {
      if (edge.pos.y > k.height() + scaledGrassSize) {
        k.destroy(edge);
      }
    });

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

    // Enhanced water flow effects for better movement illusion
    let flowTimer = 0;
    k.onUpdate(() => {
      flowTimer += k.dt();

      // Spawn water flow indicators more frequently
      if (flowTimer > 0.2) {
        flowTimer = 0;

        // Create varied flow indicators across the river
        for (let i = 0; i < 5; i++) {
          // Ensure flow indicators stay well within river bounds
          const x = bankWidth + k.rand(20, riverWidth - 40);
          const y = -10;

          // Vary the flow indicator types
          const flowType = k.rand();

          if (flowType < 0.7) {
            // Small bubbles
            k.add([
              k.circle(k.rand(2, 4)),
              k.pos(x, y),
              k.anchor("center"),
              k.color(120, 180, 255),
              k.opacity(k.rand(0.2, 0.5)),
              k.move(k.DOWN, riverSpeed * k.rand(1.1, 1.4)),
              "flow",
            ]);
          } else {
            // Elongated flow lines
            k.add([
              k.rect(k.rand(2, 5), k.rand(8, 15)),
              k.pos(x, y),
              k.anchor("center"),
              k.color(100, 150, 255),
              k.opacity(k.rand(0.2, 0.4)),
              k.move(k.DOWN, riverSpeed * k.rand(1.0, 1.3)),
              "flow",
            ]);
          }
        }

        // Add occasional larger swirls
        if (k.rand() < 0.3) {
          // Keep swirls well away from banks
          const x = bankWidth + k.rand(40, riverWidth - 80);
          const y = -15;

          k.add([
            k.circle(8),
            k.pos(x, y),
            k.anchor("center"),
            k.color(80, 120, 200),
            k.opacity(0.2),
            k.move(k.DOWN, riverSpeed * 0.9),
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
