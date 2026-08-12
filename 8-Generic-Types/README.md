# Generic Types - Lecture Documentation

## Course Structure
- **100**: Module Introduction
- **101**: A Generic Type We Already Know
- **102**: Understanding Generic Types
- **103**: Creating & Using a Generic Type
- **104**: Generic Functions & Inference
- **105**: Working with Multiple Generic Parameters
- **106**: Generics & Constraints
- **107**: Constraints & Multiple Generic Types
- **108**: Working with Generic Classes & Interfaces
- **109**: Summary

## Lecture 100: Module Introduction
Welcome to the Generic Types section! Generics are one of TypeScript's most powerful features — they let you create reusable, type-safe components that work with multiple types. In this section, we'll explore how generics work, how to write generic functions and classes, and how to use constraints to enforce requirements on type parameters.

## Lecture 101: A Generic Type We Already Know

This lecture reveals an important insight: **you've already been using generic types** without realizing it! Generics aren't a new concept — they're already baked into TypeScript's core.

### Generics Are "Templates"

A **generic type** is a template that lets you define a type that works with **multiple types** while still maintaining type safety — think of it like a cookie cutter that works for different dough types, but each individual cookie is precisely shaped.

### The "T" Parameter

- **`T`** stands for "Type" — it's a **placeholder** for the actual type used later
- It's a **parameter** for types, just like function parameters are for values
- Any valid identifier works: `T`, `U`, `Key`, `Value` (though `T` is the convention)

### Where You've Seen This Before

Every time you wrote `string[]` or `Array<string>`:
```typescript
const names: string[] = ["usama", "max"];
const numbers: Array<number> = [1, 2, 3];
```

You were already using generics! `string[]` is **syntactic sugar** for `Array<string>`.

Other built-in generics you know:
- `Promise<number>` — a promise that resolves to a number
- `ReadonlyArray<string>` — a read-only array of strings
- `Map<string, number>` — a map from strings to numbers

### Without Generics — Code Duplication
```typescript
class StringArray {
  private items: string[] = [];
  push(item: string) { this.items.push(item); }
  get(index: number): string { return this.items[index]!; }
}

class NumberArray {
  private items: number[] = [];
  push(item: number) { this.items.push(item); }
  get(index: number): number { return this.items[index]!; }
}
```

### With Generics — One Type, Many Type Arguments
```typescript
class DataContainer<T> {
  private items: T[] = [];

  add(item: T) { this.items.push(item); }
  get(index: number): T { return this.items[index]!; }
  getAll(): T[] { return [...this.items]; }
  get count(): number { return this.items.length; }
}

// Same blueprint, different type arguments:
const stringContainer = new DataContainer<string>();
const numberContainer = new DataContainer<number>();
```

### Key Takeaways
1. **Generics are templates** — they parameterize types with placeholders like `T`
2. **Built-in generics** — `Array<T>`, `Promise<T>`, `Map<K,V>` are already in the language
3. **Eliminates code duplication** — write once, work with any type
4. **Type-safe** — TypeScript tracks the specific type at compile time
5. **`T` is a convention** — but any identifier works for the type parameter

### Code Demo (in `src/generics-intro.ts`)
We implemented:
1. **Equivalence demo** — `string[]` vs `Array<string>`, `Promise<number>` usage
2. **Custom generic class** — `DataContainer<T>` with type-safe `add()`, `get()`, `getAll()`, and `count`
3. **Multiple type instantiations** — using `DataContainer<string>` and `DataContainer<number>`

## Lecture 102: Understanding Generic Types

Generic types are **"templates" that accept type parameters** — just like functions accept value parameters, generic types accept **type parameters** that get filled in with concrete types later.

### The Core Idea: Type Parameters

```typescript
// Regular function (takes value parameters):
function identity(value: string): string { return value; }

// Generic function (takes TYPE parameter + value parameter):
function identity<T>(value: T): T { return value; }
```

- `T` is a **placeholder** — "give me a type, and I'll give you back the same type"
- You **don't know** what `T` is when writing the function — TypeScript figures it out at the call site

### How They Work: "Type-level Functions"

```typescript
// At the type level:
Array<T>          // When T = string → string[]
                // When T = number → number[]

function wrapInArray<T>(value: T): T[] {
  return [value];
}
// TypeScript internally "substitutes":
// wrapInArray<string> → (value: string) => string[]
// wrapInArray<number> → (value: number) => number[]
```

This is **compile-time only** — `T` doesn't exist at runtime. TypeScript **erases** it.

### Type Inference — The Smart Part

TypeScript often infers `T` automatically — you don't need to specify it:

```typescript
const numResult = identity(42);      // TypeScript infers: T = number → returns number
const strResult = identity("hello"); // TypeScript infers: T = string → returns string
const explicit = identity<string>("world"); // You can also specify explicitly
```

### Type Safety Guarantee

Generics preserve **compile-time type safety**:

```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const numArray = first([1, 2, 3]);    // Type: number | undefined
const strArray = first(["a", "b"]);   // Type: string | undefined

// ❌ Compile-time error:
// first([1, 2, 3]).charAt(0); // number has no charAt method
```

### Concrete vs Abstract — Code Duplication Problem

**Without generics** — you write nearly identical code for each type:
```typescript
class StringBox { value: string; constructor(v: string) { this.value = v; } }
class NumberBox { value: number; constructor(v: number) { this.value = v; } }
```

**With generics** — one abstraction, all types:
```typescript
class Box<T> {
  value: T;
  constructor(value: T) { this.value = value; }
  getValue(): T { return this.value; }
}

const stringBox = new Box<string>("hello"); // T = string
const numberBox = new Box<number>(42);      // T = number
```

### Generics Are Everywhere

You've been using them all along:
| Built-in Type | Generic Form | Meaning |
|---------------|-------------|---------|
| `string[]` | `Array<string>` | Array of strings |
| `Promise<number>` | `Promise<T>` | Promise resolving to number |
| `Map<string, number>` | `Map<K, V>` | Map from strings to numbers |
| `Readonly<T>` | `Readonly<T>` | T made read-only |
| `Partial<T>` | `Partial<T>` | T with all properties optional |

### Key Takeaways
1. **Generics are type-level functions** — they take type parameters and produce types
2. **Type inference** — TypeScript often figures out `T` automatically
3. **Compile-time only** — type parameters are erased from the final JavaScript
4. **No runtime cost** — but full type safety at development time
5. **Eliminates code duplication** — one generic definition, many concrete usages

### Code Demo (in `src/understanding-generics.ts`)
We implemented:
1. **`identity<T>`** — demonstrating type inference with explicit and inferred type args
2. **`Box<T>` class** — instantiated with `string`, `number`, and `boolean`
3. **`first<T>` function** — demonstrating type safety (`T | undefined` return)
4. **Commented-out error case** — showing `charAt` on a `number` would fail at compile time

## Lecture 103: Creating & Using a Generic Type

This lecture is about building your **own generic types and utilities** — going beyond built-in `Array<T>` and `Promise<T>` to create custom generic abstractions.

### Generic Function with `keyof` & Indexed Access

```typescript
// Type-safe property getter — works with ANY object type
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "usama", age: 34 };
const name = getProperty(person, "name"); // Type: string ✅
const age = getProperty(person, "age");   // Type: number ✅
// getProperty(person, "salary"); // ❌ Error — not in keyof Person
```

Key insight: `K extends keyof T` ensures `key` must be a **valid property of `T`**, and `T[K]` returns the **exact type of that property**.

### Generic Type Aliases (Type Factories)

You can create generic **type aliases** that transform types:

```typescript
// A type that makes all properties optional (mimics built-in Partial):
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type Config = { url: string; timeout: number; retries: number };
type PartialConfig = MyPartial<Config>;
// { url?: string; timeout?: number; retries?: number; }
```

```typescript
// A type that makes all properties readonly (mimics built-in Readonly):
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

### Generic Utility Types — `Logger<T>`

```typescript
type Logger<T> = (value: T) => string;

const stringLogger: Logger<string> = (val) => `String: ${val}`;
const numberLogger: Logger<number> = (val) => `Number: ${val}`;

function logAndReturn<T>(value: T, logger: Logger<T>): T {
  console.log(logger(value));
  return value;
}

logAndReturn("hello", stringLogger); // Logs: "String: hello"
logAndReturn(42, numberLogger);      // Logs: "Number: 42"
```

### Key Takeaways
1. **Generic types are factories** — give a type parameter, get a new type
2. **`K extends keyof T`** — constrains the key to valid properties
3. **`T[K]`** — retrieves the exact type of a property
4. **Type aliases can be generic** — `type MyType<T> = ...`
5. **Mapped types** `[K in keyof T]` — transform each property of a type
6. Enables **type-safe utility functions** like `getProperty`, `Partial`, `Readonly`

### Code Demo (in `src/creating-generic-types.ts`)
We implemented:
1. **`getProperty<T, K>`** — type-safe property getter with `keyof` constraint
2. **`Logger<T>` type** — generic factory for log functions
3. **`logAndReturn<T>`** — generic function using `Logger<T>`
4. **`MyPartial<T>`** — custom partial type using mapped types
5. **`MyReadonly<T>`** — custom readonly type using mapped types

## Lecture 104: Generic Functions & Inference

**Type inference** means TypeScript **automatically figures out** the type parameter(s) from the arguments you pass — you don't always need to write `<string>` or `<number>` explicitly.

### Basic Inference

TypeScript looks at the **types of the arguments** to infer the type parameter:

```typescript
function identity<T>(value: T): T {
  return value;
}

identity("hello"); // T inferred as: string
identity(42);      // T inferred as: number
```

### Multiple Type Parameters

Each type parameter is inferred **independently** from its corresponding argument:

```typescript
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const result = pair("hello", 42);
// A = string, B = number → result: [string, number]
```

### Default Type Parameters

You can provide defaults, but this only affects the **type parameter**, not the function argument:

```typescript
function wrap<T = string>(value?: T): T[] {
  return value === undefined ? [] : [value];
}

const numArray = wrap(42);       // T = number → number[]
const strArray = wrap("hello");  // T = string → string[]
const defaultArray = wrap();      // T defaults to string → string[]
```

### Inference with Array Types

```typescript
function firstTwo<T>(arr: T[]): T[] {
  return arr.slice(0, 2);
}

firstTwo([1, 2, 3, 4]);     // T = number → number[]
firstTwo(["a", "b", "c"]);  // T = string → string[]
```

### Callback Inference

TypeScript can infer type parameters from **callback function return types** too:

```typescript
function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const lengths = mapArray(["hello", "world"], (str) => str.length);
// T = string (from array), U = number (from callback return)
```

### When Inference Fails — Explicit Types Required

Sometimes TypeScript **cannot infer** the type parameter (no arguments to infer from, e.g., factory functions):

```typescript
function getPromise<T>(): Promise<T> {
  return new Promise((resolve) => resolve(null as unknown as T));
}

// ❌ Can't infer T — must specify explicitly:
const numPromise = getPromise<number>();
const strPromise = getPromise<string>();
```

### Key Takeaways
1. **TypeScript infers type parameters from arguments automatically** — no `<string>` needed most of the time
2. **Each type parameter is inferred independently** — `pair<A, B>` infers A and B separately
3. **Default type parameters** make the generic optional (`T = string`) — but don't make the argument optional
4. **Inference can fail** — especially in factory functions with no arguments
5. **Callback inference** — TypeScript infers from callback signatures and return types

### Code Demo (in `src/generic-inference.ts`)
We implemented:
1. **`identity<T>`** — basic type inference from arguments
2. **`pair<A, B>`** — independent multi-parameter inference
3. **`wrap<T>`** — default type parameter (`T = string`)
4. **`firstTwo<T>`** — inference with array types
5. **`mapArray<T, U>`** — callback return type inference
6. **`getPromise<T>`** — inference failure case, requiring explicit `<number>`

## Lecture 105: Working with Multiple Generic Parameters

Sometimes one type parameter isn't enough. When a function operates on **related values of different types**, you need **multiple type parameters** — `<A, B>` or `<T, U>`.

### Basic Syntax

Multiple type parameters are separated with commas:

```typescript
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const result = pair("hello", 42);
// A = string, B = number → [string, number]
```

### Why Multiple Parameters Are Needed

**With one parameter**, both arguments are forced to the SAME type:
```typescript
function merge<A>(obj1: A, obj2: A): A {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "usama" }, { age: 34 });
// ❌ A can't be both { name } and { age } — TypeScript error!
```

**With two parameters**, each argument gets its own type:
```typescript
function merge<A, B>(objA: A, objB: B): A & B {
  return { ...objA, ...objB };
}

const merged = merge({ name: "usama" }, { age: 34 });
// A = { name: string }, B = { age: number }
// Result: { name: string; age: number } (intersection!)
```

### Independence of Inference

Each type parameter is inferred **independently** from its corresponding argument:

```typescript
function swap<A, B>(pair: [A, B]): [B, A] {
  return [pair[1], pair[0]];
}

const swapped = swap([1, "two"]);
// A = number (from 1), B = string (from "two")
// Result: [string, number]
```

### Multiple Parameters Playing Different Roles

```typescript
function makeMap<K extends string, V>(key: K, value: V): Record<K, V> {
  return { [key]: value } as Record<K, V>;
}

const map = makeMap("username", "usama");
// K = "username" (literal), V = string
// Result: Record<"username", string>
```

### Constraints on Each Parameter

You can apply constraints independently:

```typescript
function mergeObjects<A extends object, B extends object>(objA: A, objB: B): A & B {
  return { ...objA, ...objB };
}

mergeObjects({ id: 1 }, { role: "admin" }); // ✅ Both are objects
mergeObjects({ name: "usama" }, 42);        // ❌ number does not extend object
```

### Common Use Cases
- **Merging objects** — `merge<T, U>(a: T, b: U): T & U`
- **Swapping tuple positions** — `swap<A, B>(([A, B])) => [B, A]`
- **Key-value mapping** — `makeMap<K, V>(key: K, value: V): Record<K, V>`
- **Type transformations** — combining related but distinct types

### Key Takeaways
1. **Multiple type parameters** are declared with commas: `<T, U>` or `<A, B>`
2. **Each parameter is inferred independently** — from its corresponding argument
3. **Needed when** arguments have different, unrelated types
4. **The `merge` example is classic** — `merge<T, U>(a: T, b: U): T & U` returns an intersection
5. **Constraints can apply to each** parameter independently
6. **Enables flexible utilities** — merging, swapping, mapping between types

### Code Demo (in `src/multiple-generics.ts`)
We implemented:
1. **`merge<A, B>`** — the classic object merger returning `A & B`
2. **`swap<A, B>`** — tuple position swapping with independent inference
3. **`makeMap<K, V>`** — key-value mapping with `Record<K, V>`
4. **`mergeObjects<A, B>`** — both parameters constrained to `extends object`

## Lecture 106: Generics & Constraints

Without constraints, generics accept **any type**, which can cause runtime errors. **Constraints** (`extends`) restrict what types a type parameter can be.

### The Problem — Too "Free" Type Parameters

```typescript
function merge<A, B>(objA: A, objB: B): A & B {
  return { ...objA, ...objB };
}

merge({ name: "usama" }, 34); // ❌ This compiles but makes no sense!
```

### The Solution — `extends` Constraints

```typescript
function merge<A extends object, B extends object>(objA: A, objB: B): A & B {
  return { ...objA, ...objB };
}

merge({ name: "usama" }, { age: 34 }); // ✅ Objects work
merge({ name: "usama" }, 34);          // ❌ Error — number not an object
```

### Constraint Guarantees Properties

```typescript
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b; // ✅ T guaranteed to have .length
}

longest("hello", "world!"); // ✅ string has length
longest([1, 2], [3, 4, 5]); // ✅ array has length
longest(1, 2);              // ❌ number has NO length
```

### Key Rule
> **Type parameters without constraints accept anything.** Constraints (`extends`) are your safety net to ensure type parameters have the properties/methods you rely on.

---

## Lecture 107: Constraints & Multiple Generic Types

### Constraining Each Parameter Independently

```typescript
function merge<A extends object, B extends object>(objA: A, objB: B): A & B {
  return { ...objA, ...objB };
}

const result = merge({ name: "max" }, { age: 30 });
// T = { name: string }, U = { age: number }
```

### Combining Constraints with Multiple Type Params

```typescript
function countElements<T extends { length: number }>(items: T): number {
  return items.length;
}

countElements("hello");       // 5
countElements([1, 2, 3, 4]);  // 4
countElements({ length: 10 }); // 10
countElements(42);            // ❌ number has no length
```

### Key Point
> Constraints work **per type parameter**. Mixing multiple generic types with constraints gives you precise control over each one.

---

## Lecture 108: Working with Generic Classes & Interfaces

### Generic Classes

```typescript
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) { this.data.push(item); }
  removeItem(item: T) { this.data.splice(this.data.indexOf(item), 1); }
  getItems(): T[] { return [...this.data]; }
}

const stringStorage = new DataStorage<string>();
stringStorage.addItem("hello"); // ✅
// stringStorage.addItem(42);  // ❌ Error — must be string

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1); // ✅
```

### Generic Class with Constraint

```typescript
class LengthStorage<T extends { length: number }> {
  private items: T[] = [];

  add(item: T) { this.items.push(item); }
  getTotalLength(): number {
    return this.items.reduce((total, item) => total + item.length, 0);
  }
}

const stringLenStore = new LengthStorage<string>(); // ✅ valid
// const bad = new LengthStorage<number>(); // ❌ number has no length
```

### Generic Interfaces

```typescript
interface Repository<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
  add(item: T): void;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];

  getAll(): User[] { return this.users; }
  getById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
  add(item: User) { this.users.push(item); }
}
```

### Why Generic Classes Matter
1. **One class, many types** — no code duplication
2. **Type-safe at compile time** — wrong type arguments get caught
3. **Perfect for data containers** — `DataStorage<T>`, `Repository<T>`
4. **Combines with interfaces** — `Repository<T>` defines the contract

---

## Lecture 109: Summary

### What We Learned in This Section

| Concept | Key Idea |
|---------|----------|
| **Generics** | Templates parameterized by type (`<T>`) |
| **Type inference** | TypeScript figures out `T` from arguments |
| **Multiple parameters** | `<A, B>` for related but distinct types |
| **Constraints** | `T extends Type` restricts what T can be |
| **Generic classes** | Classes parameterized with type (`DataStorage<T>`) |
| **Generic interfaces** | Interfaces parameterized with type (`Repository<T>`) |
| **Built-ins** | `Array<T>`, `Promise<T>` are already generic |

### The Big Picture
**Generics = type-level abstraction.** They let you write code once and use it with any type, while keeping **full type safety** at compile time. This is why they're pervasive in TypeScript — from the language's built-ins to frameworks like React.

### Code Demo (in `src/generic-classes.ts`)
We implemented:
1. **`DataStorage<T>`** — generic class storing and removing any type
2. **`LengthStorage<T extends { length: number }>`** — generic class with constraint
3. **`Repository<T>` interface** — generic interface implemented by `UserRepository`
4. **`longest<T>`** — generic function with constraint, valid for strings and arrays