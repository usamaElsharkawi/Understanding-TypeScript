"use strict";
// === Generic Classes, Interfaces & Constraints Summary ===
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Generic class — DataStorage<T> works with any type
class DataStorage {
    data = [];
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const stringStorage = new DataStorage();
stringStorage.addItem("hello");
stringStorage.addItem("world");
console.log(stringStorage.getItems()); // ["hello", "world"]
stringStorage.removeItem("hello");
console.log(stringStorage.getItems()); // ["world"]
// stringStorage.addItem(42); // ❌ Error — number not allowed in string storage
const numberStorage = new DataStorage();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getItems()); // [1, 2]
// 2. Generic class with constraint — only types with .length
class LengthStorage {
    items = [];
    add(item) {
        this.items.push(item);
    }
    getTotalLength() {
        return this.items.reduce((total, item) => total + item.length, 0);
    }
}
const stringLenStore = new LengthStorage();
stringLenStore.add("hello");
stringLenStore.add("world!");
console.log(stringLenStore.getTotalLength()); // 11
class UserRepository {
    users = [];
    getAll() {
        return this.users;
    }
    getById(id) {
        return this.users.find(u => u.id === id);
    }
    add(item) {
        this.users.push(item);
    }
}
const repo = new UserRepository();
repo.add({ id: 1, name: "usama" });
repo.add({ id: 2, name: "max" });
console.log(repo.getAll()); // [{ id: 1, name: "usama" }, { id: 2, name: "max" }]
console.log(repo.getById(1)); // { id: 1, name: "usama" }
console.log(repo.getById(99)); // undefined
// 4. Generic function with constraint — valid both with string and array
function longest(a, b) {
    return a.length >= b.length ? a : b;
}
console.log(longest("hello", "world!")); // "world!"
console.log(longest([1, 2, 3], [4, 5])); // [1, 2, 3]
//# sourceMappingURL=generic-classes.js.map