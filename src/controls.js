// Controls System - Handles keyboard and touch input
export function initControls(k) {
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

  // Touch controls
  let leftTouching = false;
  let rightTouching = false;

  // Left touch area
  k.onClick("leftTouch", () => {
    leftTouching = true;
    setTimeout(() => (leftTouching = false), 100); // Brief touch response
  });

  // Right touch area
  k.onClick("rightTouch", () => {
    rightTouching = true;
    setTimeout(() => (rightTouching = false), 100);
  });

  // Continuous touch handling for mobile
  if ("ontouchstart" in window) {
    let activeTouches = new Set();

    document.addEventListener("touchstart", (e) => {
      e.preventDefault();
      for (let touch of e.changedTouches) {
        const rect = k.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const scaledX = x * (k.width() / rect.width);

        if (scaledX < k.width() / 2) {
          leftTouching = true;
          activeTouches.add(touch.identifier + "_left");
        } else {
          rightTouching = true;
          activeTouches.add(touch.identifier + "_right");
        }
      }
    });

    document.addEventListener("touchend", (e) => {
      for (let touch of e.changedTouches) {
        if (activeTouches.has(touch.identifier + "_left")) {
          leftTouching = false;
          activeTouches.delete(touch.identifier + "_left");
        }
        if (activeTouches.has(touch.identifier + "_right")) {
          rightTouching = false;
          activeTouches.delete(touch.identifier + "_right");
        }
      }
    });

    document.addEventListener("touchmove", (e) => {
      e.preventDefault(); // Prevent scrolling
    });
  }

  // Movement system - applies to player when they exist
  k.onUpdate("player", (player) => {
    const moveSpeed = 300; // pixels per second

    if (leftPressed || leftTouching) {
      player.move(-moveSpeed, 0);
      console.log("Moving left, player pos:", player.pos.x);
    }
    if (rightPressed || rightTouching) {
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

  // Debug info (can be removed later)
  k.onUpdate(() => {
    if (k.debug.inspect) {
      k.debug.log(
        `Controls: L:${leftPressed || leftTouching} R:${
          rightPressed || rightTouching
        }`
      );
    }
  });
}
