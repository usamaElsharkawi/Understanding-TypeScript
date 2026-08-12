"use strict";
// === Understanding Generic Types Example ===
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Identity function — type inference in action
function identity(value) {
    return value;
}
// TypeScript infers T from the argument
const numResult = identity(42); // Type: number
const strResult = identity("hello"); // Type: string
console.log(numResult); // 42
console.log(strResult); // "hello"
// You can also explicitly specify the type
const explicit = identity("world"); // Type: string
console.log(explicit); // "world"
// 2. Box class — same abstraction, different type arguments
class Box {
    value;
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
const stringBox = new Box("hello");
const numberBox = new Box(42);
const booleanBox = new Box(true);
console.log(stringBox.getValue()); // "hello"
console.log(numberBox.getValue()); // 42
console.log(booleanBox.getValue()); // true
// 3. Type safety — generics preserve compile-time guarantees
function first(arr) {
    return arr[0];
}
const numArray = first([1, 2, 3]); // Type: number | undefined
const strArray = first(["a", "b"]); // Type: string | undefined
console.log(numArray); // 1
console.log(strArray); // "a"
// Uncomment to see compile-time error:
// const invalid = first([1, 2, 3]).charAt(0); // ❌ number has no charAt
//# sourceMappingURL=understanding-generics.js.map