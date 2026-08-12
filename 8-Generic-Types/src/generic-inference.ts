// === Generic Functions & Inference Example ===

// 1. Basic type inference — TypeScript infers T from the argument
function identity<T>(value: T): T {
  return value;
}

const str = identity("hello"); // TypeScript infers T = string
const num = identity(42);       // TypeScript infers T = number

console.log(str); // "hello"
console.log(num); // 42

// 2. Multiple type parameters — each inferred independently from arguments
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const result = pair("hello", 42);
// TypeScript infers: A = string, B = number
console.log(result); // ["hello", 42]

// 3. Default type parameters — T defaults to string if not specified
function wrap<T = string>(value?: T): T[] {
  return value === undefined ? [] : [value];
}

const numArray = wrap(42);       // T = number → [number]
const strArray = wrap("hello");  // T = string → [string]
const defaultArray = wrap();      // T defaults to string → string[]

console.log(numArray);     // [42]
console.log(strArray);     // ["hello"]
console.log(defaultArray); // [] (empty string[] due to default T)

// 4. Inference with array types
function firstTwo<T>(arr: T[]): T[] {
  return arr.slice(0, 2);
}

const firstNumbers = firstTwo([1, 2, 3, 4]);    // T = number → number[]
const firstStrings = firstTwo(["a", "b", "c"]);  // T = string → string[]
console.log(firstNumbers); // [1, 2]
console.log(firstStrings); // ["a", "b"]

// 5. Callback inference — T and U inferred from both array and callback
function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const lengths = mapArray(["hello", "world"], (str) => str.length);
// T = string (from array), U = number (from callback return)
console.log(lengths); // [5, 5]

// 6. Inference failure — must specify type explicitly (no argument to infer from)
function getPromise<T>(): Promise<T> {
  // Simulating a promise that resolves to some value of type T
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null as unknown as T), 100);
  });
}

// ❌ TypeScript can't infer T here — no arguments to infer from
// Must explicitly specify: getPromise<number>()
async function demoPromise() {
  const promise = getPromise<number>();
  const value = await promise;
  // value is typed as number
  console.log("Promise resolved");
}

demoPromise(); // Logs: "Promise resolved"