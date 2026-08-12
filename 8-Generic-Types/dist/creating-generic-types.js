"use strict";
// === Creating & Using Generic Types Example ===
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Generic type with keyof constraint — type-safe property getter
function getProperty(obj, key) {
    return obj[key];
}
const person = { name: "usama", age: 34, email: "test@test.com" };
const personName = getProperty(person, "name"); // Type: string
const personAge = getProperty(person, "age"); // Type: number
console.log(personName); // "usama"
console.log(personAge); // 34
const stringLogger = (val) => `String: ${val}`;
const numberLogger = (val) => `Number: ${val}`;
function logAndReturn(value, logger) {
    console.log(logger(value));
    return value;
}
logAndReturn("hello", stringLogger); // Logs: "String: hello"
logAndReturn(42, numberLogger); // Logs: "Number: 42"
// { url?: string; timeout?: number; retries?: number; }
const partialConfig = { url: "https://api.example.com" };
console.log(partialConfig.url); // "https://api.example.com"
const roUser = { name: "usama", email: "test@test.com" };
// roUser.name = "max"; // ❌ Error — readonly property
//# sourceMappingURL=creating-generic-types.js.map