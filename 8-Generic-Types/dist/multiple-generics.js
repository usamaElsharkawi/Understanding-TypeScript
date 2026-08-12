"use strict";
// === Multiple Generic Parameters Example ===
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Classic merge — each argument gets its own type parameter
function merge(objA, objB) {
    return { ...objA, ...objB };
}
const merged = merge({ name: "usama" }, { age: 34 });
// A = { name: string }, B = { age: number }
// Result: { name: string; age: number } (intersection type!)
console.log(merged); // { name: "usama", age: 34 }
console.log(merged.name); // "usama"
console.log(merged.age); // 34
// 2. swap — two type parameters, tuples swap positions
function swap(pair) {
    return [pair[1], pair[0]];
}
const swapped = swap([1, "two"]);
// A = number (from 1), B = string (from "two")
// Result: [string, number]
console.log(swapped); // ["two", 1]
// 3. Generic key-value mapping — K and V play different roles
function makeMap(key, value) {
    return { [key]: value };
}
const nameMap = makeMap("username", "usama");
// K = "username" (literal), V = string
console.log(nameMap); // { username: "usama" }
console.log(nameMap.username); // "usama"
// 4. Multiple type parameters with constraints on each
function mergeObjects(objA, objB) {
    return { ...objA, ...objB };
}
const combined = mergeObjects({ id: 1 }, { role: "admin" });
// Both A and B must be objects
console.log(combined); // { id: 1, role: "admin" }
// Uncomment to see the constraint error:
// mergeObjects({ name: "usama" }, 42); // ❌ number does not extend object
//# sourceMappingURL=multiple-generics.js.map