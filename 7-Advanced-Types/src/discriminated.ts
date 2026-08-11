// === Discriminated Unions Example ===

// Each member has a `kind` property with a distinct literal type
type LoadingState = { kind: "loading" };

type ErrorState = { kind: "error"; message: string };

type SuccessState = { kind: "success"; data: string };

// Union of all states
type NetworkCard = LoadingState | ErrorState | SuccessState;

// Using a discriminated union — TypeScript narrows automatically via `kind`
function renderCard(card: NetworkCard) {
  switch (card.kind) {
    case "loading":
      return "Loading..."; // ✅ TypeScript knows: LoadingState
    case "error":
      return `Error: ${card.message}`; // ✅ TypeScript knows: ErrorState
    case "success":
      return `Data: ${card.data}`; // ✅ TypeScript knows: SuccessState
  }
}

// Test it
const loadingCard: NetworkCard = { kind: "loading" };
const errorCard: NetworkCard = { kind: "error", message: "Failed to load!" };
const successCard: NetworkCard = { kind: "success", data: "Hello, World!" };

console.log(renderCard(loadingCard));  // "Loading..."
console.log(renderCard(errorCard));    // "Error: Failed to load!"
console.log(renderCard(successCard));  // "Data: Hello, World!"

// === Shape Example (bonus) ===
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Square = { kind: "square"; size: number };

type Shape = Circle | Rectangle | Square;

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2; // ✅ Circle — has radius
  } else if (shape.kind === "rectangle") {
    return shape.width * shape.height; // ✅ Rectangle — has width & height
  } else {
    return shape.size ** 2; // ✅ Square — has size (last remaining case)
  }
}

const circle: Shape = { kind: "circle", radius: 5 };
const rect: Shape = { kind: "rectangle", width: 10, height: 5 };
const square: Shape = { kind: "square", size: 4 };

console.log(getArea(circle));  // 78.53981633974483
console.log(getArea(rect));    // 50
console.log(getArea(square));  // 16