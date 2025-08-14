import kaplay from "kaplay";

console.log("Testing KAPLAY minimal setup...");

// Minimal KAPLAY test
const k = kaplay({
  width: 800,
  height: 600,
  background: [100, 150, 200],
});

// Test scene
k.scene("test", () => {
  console.log("Test scene loaded");

  // Simple background
  k.add([k.rect(k.width(), k.height()), k.color(50, 100, 150), k.pos(0, 0)]);

  // Test text
  k.add([
    k.text("KAPLAY WORKING!", { size: 48 }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  // Test rectangle
  k.add([
    k.rect(100, 50),
    k.pos(k.width() / 2, k.height() / 2 + 100),
    k.anchor("center"),
    k.color(0, 255, 0),
  ]);
});

// Go to test scene
k.go("test");
