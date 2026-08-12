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