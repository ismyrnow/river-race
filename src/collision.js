// Collision System - Handles all collision detection and responses
export function initCollisions(k, gameState) {
  // Player collision with shore/banks
  k.onCollide("player", "shore", (player, shore) => {
    // Game over when hitting the shore
    gameOver(k, gameState);
  });

  // Player collision with rocks
  k.onCollide("player", "rock", (player, rock) => {
    // Game over when hitting rocks
    gameOver(k, gameState);
  });

  // Player collision with coins
  k.onCollide("player", "coin", (player, coin) => {
    // Collect coin
    collectCoin(k, gameState, coin);
  });

  // Collision detection utility functions
  function gameOver(k, gameState) {
    if (!gameState.isPlaying) return; // Prevent multiple game overs

    gameState.isPlaying = false;

    // Add some visual feedback
    k.shake(10);

    // Transition to game over screen after brief delay
    setTimeout(() => {
      k.go("gameOver");
    }, 1000);
  }

  function collectCoin(k, gameState, coin) {
    // Add to score
    gameState.score += 10;

    // Visual feedback - simple scale animation
    coin.scale = 1.5;
    coin.opacity = 0.7;

    // Remove coin after brief animation
    setTimeout(() => {
      if (coin && coin.exists()) {
        k.destroy(coin);
      }
    }, 100);

    // Particle effect (simple)
    createCoinCollectEffect(k, coin.pos.x, coin.pos.y);
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
        {
          vel: k.vec2(k.rand(-50, 50), k.rand(-50, -20)),
        },
      ]);

      // Animate particle
      k.onUpdate(() => {
        if (particle.exists()) {
          particle.move(particle.vel);
          particle.opacity -= k.dt() * 2;
          particle.vel.y += 100 * k.dt(); // Gravity
        }
      });
    }
  }

  // Advanced collision detection helpers
  function checkCircleCollision(obj1, obj2, radius1, radius2) {
    const dx = obj1.pos.x - obj2.pos.x;
    const dy = obj1.pos.y - obj2.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < radius1 + radius2;
  }

  function checkRectCollision(obj1, obj2) {
    return (
      obj1.pos.x < obj2.pos.x + obj2.width &&
      obj1.pos.x + obj1.width > obj2.pos.x &&
      obj1.pos.y < obj2.pos.y + obj2.height &&
      obj1.pos.y + obj1.height > obj2.pos.y
    );
  }

  // Export utility functions for use in other modules
  window.collisionUtils = {
    checkCircleCollision,
    checkRectCollision,
    gameOver: () => gameOver(k, gameState),
    collectCoin: (coin) => collectCoin(k, gameState, coin),
  };
}
