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