// === Creating & Using Generic Types Example ===

// 1. Generic type with keyof constraint — type-safe property getter
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "usama", age: 34, email: "test@test.com" };
const personName = getProperty(person, "name"); // Type: string
const personAge = getProperty(person, "age");   // Type: number

console.log(personName); // "usama"
console.log(personAge);  // 34
// getProperty(person, "salary"); // ❌ Error — "salary" not in keyof Person

// 2. Generic Logger type — a factory for "logger" functions
type Logger<T> = (value: T) => string;

const stringLogger: Logger<string> = (val) => `String: ${val}`;
const numberLogger: Logger<number> = (val) => `Number: ${val}`;

function logAndReturn<T>(value: T, logger: Logger<T>): T {
  console.log(logger(value));
  return value;
}

logAndReturn("hello", stringLogger); // Logs: "String: hello"
logAndReturn(42, numberLogger);      // Logs: "Number: 42"

// 3. Custom generic utility — MyPartial (mimics TypeScript's built-in Partial)
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type Config = { url: string; timeout: number; retries: number };
type PartialConfig = MyPartial<Config>;
// { url?: string; timeout?: number; retries?: number; }

const partialConfig: PartialConfig = { url: "https://api.example.com" };
console.log(partialConfig.url); // "https://api.example.com"

// 4. Custom generic utility — MyReadonly (mimics TypeScript's built-in Readonly)
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type User = { name: string; email: string };
type ReadonlyUser = MyReadonly<User>;

const roUser: ReadonlyUser = { name: "usama", email: "test@test.com" };
// roUser.name = "max"; // ❌ Error — readonly property