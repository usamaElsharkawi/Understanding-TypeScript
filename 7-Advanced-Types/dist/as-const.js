"use strict";
// === as const Example ===
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Without as const — types are widened to general types
const configWide = {
    url: "https://api.example.com",
    timeout: 5000,
    method: "GET",
};
// configWide.url is: string
// configWide.timeout is: number
// configWide.method is: string
// 2. With as const — types are narrowed to literal types
const config = {
    url: "https://api.example.com",
    timeout: 5000,
    method: "GET",
};
// config.url is: "https://api.example.com" (literal type!)
// config.timeout is: 5000 (literal type!)
// config.method is: "GET" (literal type!)
console.log(config.url); // "https://api.example.com"
console.log(config.timeout); // 5000
console.log(config.method); // "GET"
// 3. Arrays with as const become readonly tuples
const colors = ["red", "green", "blue"];
// Type: readonly ["red", "green", "blue"] — a tuple!
console.log(colors[0]); // "red" — the literal type, not string
// colors.push("yellow"); // ❌ Error: readonly array
// 4. Using typeof + keyof + as const for exhaustive union types
const DIRECTIONS = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
};
// Equivalent to: "UP" | "DOWN" | "LEFT" | "RIGHT"
function move(direction) {
    switch (direction) {
        case DIRECTIONS.UP:
            return "Going up!";
        case DIRECTIONS.DOWN:
            return "Going down!";
        case DIRECTIONS.LEFT:
            return "Going left!";
        case DIRECTIONS.RIGHT:
            return "Going right!";
    }
}
console.log(move("UP")); // "Going up!"
console.log(move("LEFT")); // "Going left!"
// 5. Function returning as const object
function getConfig() {
    return {
        endpoint: "https://api.example.com",
        retries: 3,
    };
}
const cfg = getConfig();
// cfg.endpoint is "https://api.example.com" (literal type!)
console.log(cfg.endpoint);
console.log(cfg.retries);
//# sourceMappingURL=as-const.js.map