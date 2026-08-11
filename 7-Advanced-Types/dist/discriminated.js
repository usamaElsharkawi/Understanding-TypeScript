"use strict";
// === Discriminated Unions Example ===
Object.defineProperty(exports, "__esModule", { value: true });
// Using a discriminated union — TypeScript narrows automatically via `kind`
function renderCard(card) {
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
const loadingCard = { kind: "loading" };
const errorCard = { kind: "error", message: "Failed to load!" };
const successCard = { kind: "success", data: "Hello, World!" };
console.log(renderCard(loadingCard)); // "Loading..."
console.log(renderCard(errorCard)); // "Error: Failed to load!"
console.log(renderCard(successCard)); // "Data: Hello, World!"
function getArea(shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2; // ✅ Circle — has radius
    }
    else if (shape.kind === "rectangle") {
        return shape.width * shape.height; // ✅ Rectangle — has width & height
    }
    else {
        return shape.size ** 2; // ✅ Square — has size (last remaining case)
    }
}
const circle = { kind: "circle", radius: 5 };
const rect = { kind: "rectangle", width: 10, height: 5 };
const square = { kind: "square", size: 4 };
console.log(getArea(circle)); // 78.53981633974483
console.log(getArea(rect)); // 50
console.log(getArea(square)); // 16
//# sourceMappingURL=discriminated.js.map