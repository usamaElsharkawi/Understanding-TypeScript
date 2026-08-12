// === Generic Classes, Interfaces & Constraints Summary ===

// 1. Generic class — DataStorage<T> works with any type
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems(): T[] {
    return [...this.data];
  }
}

const stringStorage = new DataStorage<string>();
stringStorage.addItem("hello");
stringStorage.addItem("world");
console.log(stringStorage.getItems()); // ["hello", "world"]
stringStorage.removeItem("hello");
console.log(stringStorage.getItems()); // ["world"]
// stringStorage.addItem(42); // ❌ Error — number not allowed in string storage

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getItems()); // [1, 2]

// 2. Generic class with constraint — only types with .length
class LengthStorage<T extends { length: number }> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  getTotalLength(): number {
    return this.items.reduce((total, item) => total + item.length, 0);
  }
}

const stringLenStore = new LengthStorage<string>();
stringLenStore.add("hello");
stringLenStore.add("world!");
console.log(stringLenStore.getTotalLength()); // 11
// const bad = new LengthStorage<number>(); // ❌ number has no length

// 3. Generic interface — Repository<T> contract
interface Repository<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
  add(item: T): void;
}

interface User {
  id: number;
  name: string;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  add(item: User) {
    this.users.push(item);
  }
}

const repo = new UserRepository();
repo.add({ id: 1, name: "usama" });
repo.add({ id: 2, name: "max" });
console.log(repo.getAll());               // [{ id: 1, name: "usama" }, { id: 2, name: "max" }]
console.log(repo.getById(1));             // { id: 1, name: "usama" }
console.log(repo.getById(99));            // undefined

// 4. Generic function with constraint — valid both with string and array
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("hello", "world!")); // "world!"
console.log(longest([1, 2, 3], [4, 5]));  // [1, 2, 3]