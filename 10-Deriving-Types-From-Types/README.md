# Section 10: Deriving Types From Types

## Course Structure

- **118.** Module Introduction ✅
- **119.** Using "typeof" ✅
- **120.** "typeof" & A More Useful Example ✅
- **121.** Another Great Use-case for "typeof" ✅
- **122.** Extracting Keys with "keyof" ✅
- **123.** "keyof" & A More Useful Example
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
