"use strict";
// === Function Overloads Example ===
Object.defineProperty(exports, "__esModule", { value: true });
// Implementation signature — hidden from callers
function combine(a, b) {
    if (typeof a === "string" && typeof b === "string") {
        return a + b; // string concatenation
    }
    return Number(a) + Number(b); // numeric addition
}
// ✅ Correct return types based on arguments
const strResult = combine("Hello", "World"); // Type: string
const numResult = combine(10, 20); // Type: number
console.log(strResult); // "HelloWorld"
console.log(numResult); // 30
function get(obj, key) {
    return obj[key];
}
const scores = [98, 87, 92];
const firstScore = get(scores, 0); // ✅ Type: number (from array)
const userRoles = { alice: "admin", bob: "user" };
const aliceRole = get(userRoles, "alice"); // ✅ Type: string (from object)
console.log(firstScore); // 98
console.log(aliceRole); // "admin"
//# sourceMappingURL=overloads.js.map