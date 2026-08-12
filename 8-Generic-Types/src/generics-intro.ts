// === Generics Intro Example ===

// 1. string[] and Array<string> are the same thing!
const names: string[] = ["usama", "max", "ola"];
const namesGeneric: Array<string> = ["usama", "max", "ola"];

console.log(names);         // ["usama", "max", "ola"]
console.log(namesGeneric);  // ["usama", "max", "ola"]

// 2. Promise<T> — a generic that resolves to a specific type
const numberPromise: Promise<number> = Promise.resolve(42);
const stringPromise: Promise<string> = Promise.resolve("hello");

numberPromise.then(result => {
  // result is typed as number — TypeScript infers it from Promise<number>
  console.log(result.toFixed(2)); // ✅ Safe
});

// 3. Custom generic class — a type-safe data container
class DataContainer<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

    get(index: number): T {
    return this.items[index]!;
  }

  getAll(): T[] {
    return [...this.items];
  }

  get count(): number {
    return this.items.length;
  }
}

// Usage with different type arguments
const stringContainer = new DataContainer<string>();
stringContainer.add("hello");
stringContainer.add("world");
console.log(stringContainer.get(0));    // "hello"
console.log(stringContainer.getAll());  // ["hello", "world"]

const numberContainer = new DataContainer<number>();
numberContainer.add(1);
numberContainer.add(2);
numberContainer.add(3);
console.log(numberContainer.get(1));  // 2
console.log(numberContainer.count);   // 3