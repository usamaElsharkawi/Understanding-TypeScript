"use strict";
// === Index Types Example ===
Object.defineProperty(exports, "__esModule", { value: true });
const dict = {
    hello: "world",
    foo: "bar",
};
const someKey = "name"; // ✅ valid
console.log(someKey); // "name"
// 4. Generic pluck function using index type constraints
function pluck(obj, key) {
    return obj[key];
}
const person = {
    name: "usama",
    age: 34,
    email: "test@test.com",
};
const personName = pluck(person, "name"); // ✅ Type: string
const personAge = pluck(person, "age"); // ✅ Type: number
console.log(personName); // "usama"
console.log(personAge); // 34
// pluck(person, "salary"); // ❌ Error — "salary" does not extend keyof Person
//# sourceMappingURL=index-types.js.map