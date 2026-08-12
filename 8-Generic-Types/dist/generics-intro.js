"use strict";
// === Generics Intro Example ===
Object.defineProperty(exports, "__esModule", { value: true });
// 1. string[] and Array<string> are the same thing!
const names = ["usama", "max", "ola"];
const namesGeneric = ["usama", "max", "ola"];
console.log(names); // ["usama", "max", "ola"]
console.log(namesGeneric); // ["usama", "max", "ola"]
// 2. Promise<T> — a generic that resolves to a specific type
const numberPromise = Promise.resolve(42);
const stringPromise = Promise.resolve("hello");
numberPromise.then(result => {
    // result is typed as number — TypeScript infers it from Promise<number>
    console.log(result.toFixed(2)); // ✅ Safe
});
// 3. Custom generic class — a type-safe data container
class DataContainer {
    items = [];
    add(item) {
        this.items.push(item);
    }
    get(index) {
        return this.items[index];
    }
    getAll() {
        return [...this.items];
    }
    get count() {
        return this.items.length;
    }
}
// Usage with different type arguments
const stringContainer = new DataContainer();
stringContainer.add("hello");
stringContainer.add("world");
console.log(stringContainer.get(0)); // "hello"
console.log(stringContainer.getAll()); // ["hello", "world"]
const numberContainer = new DataContainer();
numberContainer.add(1);
numberContainer.add(2);
numberContainer.add(3);
console.log(numberContainer.get(1)); // 2
console.log(numberContainer.count); // 3
//# sourceMappingURL=generics-intro.js.map