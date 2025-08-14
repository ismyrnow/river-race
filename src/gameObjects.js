// Game Objects - Handles creation and management of game entities
export function initGameObjects(k) {
  console.log("Initializing game objects...");

  // Player creation and management
  function createPlayer() {
    console.log("Creating player...");
    const player = k.add([
      k.rect(40, 30), // Placeholder rectangle for barrel
      k.pos(k.width() / 2, k.height() - 100),
      k.anchor("center"),
      k.color(139, 69, 19), // Brown barrel color
      k.area(),
      "player",
      {
        speed: 300,
      },
    ]);

    console.log("Player created successfully");
    return player;
  }

  // Add player when entering game scene
  k.onSceneEnter("game", () => {
    console.log("Game scene entered, creating player...");
    createPlayer();
  });

  // Cleanup when leaving game scene
  k.onSceneLeave("game", () => {
    console.log("Leaving game scene, cleaning up...");
    k.destroyAll("player");
  });

  console.log("Game objects system initialized");
}
