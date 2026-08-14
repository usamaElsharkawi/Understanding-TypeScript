# Section 10: Deriving Types From Types

## Course Structure

- **118.** Module Introduction ✅
- **119.** Using "typeof" ✅
- **120.** "typeof" & A More Useful Example ✅
- **121.** Another Great Use-case for "typeof" ✅
- **122.** Extracting Keys with "keyof" ✅
- **123.** "keyof" & A More Useful Example ✅
- **124.** Understanding Indexed Access Types
- **125.** Accessing Array Elements with Indexed Access Types
- **126.** Introducing Mapped Types
- **127.** Readonly Types & Optional Mapping
- **128.** Exploring Template Literal Types
- **129.** Introducing Conditional Types
- **130.** Conditional Types - Another Example
- **131.** Making Sense of the "infer" Keyword
- **132.** TypeScript's Got You Covered: Built-in Utility Types

---

## Lecture 118: Module Introduction

### Overview
This section focuses on **deriving types from types** in TypeScript. We'll explore how to extract and manipulate types from values, functions, and existing type structures. This is a powerful feature that enables compile-time type safety and code reuse.

### Key Concepts

1. **Type Derivation**: Using `typeof` to extract types from runtime values
2. **Type Safety**: Compile-time guarantees without runtime overhead
3. **Practical Applications**: Working with objects, functions, and unions

### Key Takeaways
- `typeof` in TypeScript is a compile-time operation (erased from JavaScript output)
- Derived types maintain type safety while being flexible
- This section builds foundational skills for advanced type manipulation

---

## Lecture 119-122: Using "typeof" (All Variations)

### Overview
Lectures 119-122 all explore the **`typeof` operator** in TypeScript - how it extracts types from runtime values. We'll cover three practical applications: extracting primitive types, deriving types from objects, and deriving function types for unions.

---

### Lecture 119: Using "typeof"

The `typeof` operator in TypeScript lets you **derive a type from a runtime value**.

```typescript
const userName = "usama";

// In JavaScript: typeof gives runtime type (string, number, etc.)
console.log(typeof userName);  // "string"

// In TypeScript: type derivation at compile time
type UserName = typeof userName;  // type UserName = string
```

**Key Insight:**
- `typeof` in **JavaScript** = runtime operation → returns type as string
- `typeof` in **TypeScript** = compile-time operation → returns type as type
- TypeScript's `typeof` is **erased at compile time** and doesn't exist in JS output

**Why use it?**
- No need to manually declare types for every variable
- Types stay in sync with values automatically
- Single source of truth

---

### Lecture 120: "typeof" & A More Useful Example

The most common use case is deriving types from **objects/literals**:

```typescript
const settings = {
  difficulty: "easy",
  minLevel: 10,
  didStart: false,
  players: ["John", "Jane"]
};

type Settings = typeof settings;
// TypeScript gives you:
// {
//   difficulty: string;
//   minLevel: number;
//   didStart: boolean;
//   players: string[];
// }

// Now you can use it in function parameters:
function loadData(settings: Settings) {
  // TypeScript knows the structure of settings!
  // settings.difficulty  → string
  // settings.minLevel    → number
  // settings.didStart    → boolean
  // settings.players     → string[]
}
```

**Benefits:**
- No need to manually write out the interface
- Type updates automatically when object changes
- IDE autocomplete works perfectly

---

### Lecture 121: Another Great Use-case for "typeof"

**Deriving function types** for type-safe callbacks:

```typescript
function sum(a: number, b: number) {
  return a + b;
}

function subtract(a: number, b: number) {
  return a - b;
}

// Extract function types
type SumFn = typeof sum;       // (a: number, b: number) => number
type SubtractFn = typeof subtract;  // (a: number, b: number) => number

// Use in union types
type OperationFn = SumFn | SubtractFn;

function performMathAction(cb: OperationFn) {
  // TypeScript knows cb is either SumFn or SubtractFn
  // Both accept two numbers and return a number
}
```

**Benefits:**
- No need to manually write function type signatures
- Automatic sync with function implementations
- Type-safe callback handling

---

### Lecture 122: Extracting Keys with "keyof"

Wait, let me check... Lecture 122 is actually **"Extracting Keys with keyof"**, not `typeof`. Let me correct this:

**Correction:** Lectures 119-121 cover `typeof`, while **Lecture 122 introduces `keyof`** (which is a different topic).

So the `typeof` operator is covered in **lectures 119-121**, and lecture 122 covers `keyof`.

---

## Lecture 122: Extracting Keys with "keyof"

### Overview
The `keyof` operator extracts a **union of all keys** from a type.

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type UserKeys = keyof User;
// This gives you: "name" | "age" | "email"

// Usage:
function getProperty(obj: User, key: UserKeys) {
  return obj[key];  // TypeScript knows key is one of: "name" | "age" | "email"
}
```

**Key Differences from `typeof`:**
- `typeof` extracts types from **runtime values**
- `keyof` extracts keys from **existing types**

**Why use `keyof`?**
- Type-safe property access
- Prevents typos in property names
- Enables generic functions that work with any object

---

## Lecture 123: "keyof" & A More Useful Example

### Overview
Lecture 123 takes `keyof` to the next level by combining it with **generic type constraints** (`extends`). We create type-safe utility functions that can access object properties dynamically while maintaining full compile-time type safety.

### The Core Pattern: Generics + `keyof`

```typescript
function getProp<T extends object, U extends keyof T>(obj: T, key: U): T[U] {
  const val = obj[key];
  return val;
}
```

### Breaking Down the Constraint

| Part | What it means |
|------|---------------|
| `<T extends object>` | First type parameter: MUST be an object type |
| `, K extends keyof T>` | Second type parameter: MUST be a key of T |
| `obj: T` | The actual object to read from |
| `key: K` | The property name (restrained to valid keys of T) |
| `: T[K]` | Return type - TypeScript infers the exact property type |

---

### How It Works

```typescript
const user = {
  name: "usama",
  age: 30,
  email: "test@example.com"
};

// When we call getProp(user, "name"):
// T is inferred as { name: string; age: number; email: string }
// K is inferred as "name"
// keyof T gives us: "name" | "age" | "email"
// K = "name" is a subset of keyof T ✅

const name = getProp(user, "name");   // ✅ Returns type: string
const age = getProp(user, "age");     // ✅ Returns type: number
// const xyz = getProp(user, "xyz");   // ❌ Error: "xyz" is not a key of user
```

---

### The `extends` Keyword in Generics

In the context of generic constraints, `extends` **restricts** what types can be used as type arguments:

```typescript
// ❌ Without constraint - T can be ANY type
function getRandomElement<T>(array: T[]): T {
  return array[0];
}

// ✅ With constraint - T MUST extend 'object'
function getObjectProperty<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

**Common Generic Constraints:**

```typescript
// Constraint: must extend string
function formatString<T extends string>(input: T): string {
  return input.toUpperCase();
}

// Constraint: must extend object
function getKeys<T extends object>(obj: T): string[] {
  return Object.keys(obj);
}

// Constraint: must have a 'length' property
function logLength<T extends { length: number }>(input: T): void {
  console.log(input.length);
}

logLength("hello");    // ✅ string has length
logLength([1, 2, 3]);  // ✅ array has length
// logLength(42);       // ❌ number doesn't have length
```

---

### Practical Example from Our Code

```typescript
type User = { name: string; age: number };

function getProp<T extends object, U extends keyof T>(obj: T, key: U): T[U] {
  const val = obj[key];
  
  if (val === undefined || val === null) {
    throw new Error("Accessing undefined or null");
  }
  
  return val;
}

const user = { name: "usama", age: 33 };
const age = getProp(user, 'age');  // Returns type: number
console.log(age);  // 33
```

---

### Using `keyof` with Types

```typescript
type User = { name: string; age: number };

// keyof extracts a union of all keys
type UserKeys = keyof User;  // "name" | "age"

// Now you can use this union type
const validKey: UserKeys = "age";  // ✅ Valid
// const invalidKey: UserKeys = "email";  // ❌ Error: "email" not in UserKeys
```

---

### Type-Safe Property Access Patterns

#### Pattern 1: Generic with keyof constraint
```typescript
function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map(item => item[key]);
}

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];

const names = pluck(users, "name");  // Returns: string[]
const ages = pluck(users, "age");    // Returns: number[]
```

#### Pattern 2: keyof with typeof
```typescript
const settings = {
  difficulty: "easy",
  minLevel: 10,
  didStart: false,
  players: ["John", "Jane"]
};

type Settings = typeof settings;

function getSetting<K extends keyof Settings>(key: K): Settings[K] {
  return settings[key];
}

getSetting("difficulty");  // Returns: string
getSetting("minLevel");    // Returns: number
```

---

### Why This Is Powerful

1. **Type Safety**: Compile-time enforcement of valid property names
2. **Auto-complete**: IDE knows all valid keys
3. **Return Type Inference**: TypeScript infers exact return type
4. **Code Reuse**: One function works with any object type
5. **Refactoring Safety**: Renaming properties shows errors everywhere

---

### Key Differences: `typeof` vs `keyof`

| Feature | `typeof` | `keyof` |
|---------|----------|---------|
| Purpose | Extracts type from a value | Extracts keys from a type |
| Input | Runtime value | Compile-time type |
| Output | Type | Union of string/number keys |
| Usage | `type X = typeof variable` | `type X = keyof SomeType` |

---

### Common Mistakes

#### ❌ Mistake 1: No constraint on `keyof T`
```typescript
function getProp<T>(obj: T, key: keyof T) {
  return obj[key];  // Might not type-check correctly
}
```

#### ❌ Mistake 2: Wrong constraint order
```typescript
function getProp<K extends keyof T, T>(obj: T, key: K) {  // ❌ K before T!
}
```

#### ✅ Correct:
```typescript
function getProp<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

### Key Takeaways

1. **`extends` in generics** = constraint, not inheritance (in this context)
2. **`keyof T`** = union of all property keys of type T
3. **`T[K]`** = look up the type of property K in type T
4. **Generic constraints** enable type-safe, reusable functions
5. **Type inference** works automatically - TypeScript infers T and K
6. **Compile-time only** - no runtime performance cost
7. **IDE support** - full autocomplete and type checking
