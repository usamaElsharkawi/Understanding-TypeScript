# TypeScript Basics & Basic Types

<details>
<summary>What is TypeScript?</summary>

## Core Definition

TypeScript is a **compile-time safety layer** over JavaScript:
- Types are checked during development/compilation
- Types are **erased at runtime** - only pure JavaScript ships to production
- `.ts` (typed) → `tsc` → `.js` (no types) → runtime

## What You Get vs. What You Don't

**What you get:**
- Compile-time error detection (bugs caught before deployment)
- Autocomplete and intelligent IDE support
- Self-documenting code through type annotations

**What you don't get:**
- Runtime type checking (TypeScript trusts your type assertions)

## The Bottom Line

**TypeScript is JavaScript with static types that catch errors at compile time and provide better developer tooling, without adding any runtime overhead.**

</details>

---

<details>
<summary>Fundamental Concept: Structural Typing (Shapes)</summary>

## The Core Insight

**TypeScript doesn't define types in the nominal sense - it defines shapes.**

## Nominal vs. Structural Typing

**Nominal Typing (Java, C#)**: Types are based on explicit declarations and names.
- "I am this type because I was declared as this type"

**Structural Typing (TypeScript)**: Types are based on shape/structure, not names.
- "I am this type because I have this shape"
- "If it looks like a duck and quacks like a duck, it's a duck"

## Key Principle

> **"If it has the right shape, it's the right type."**

This means:
- No explicit type declaration required for objects
- Shape compatibility is sufficient
- Excess properties are allowed
- No inheritance required

</details>

---

<details>
<summary>All Basic Types</summary>

## 1. String Type

**Purpose**: Represents textual data.

```typescript
let userName: string;
userName = "usama";
```

**Key points**:
- Ensures variable contains only text
- Compile-time checking prevents type mismatches
- All JavaScript string methods work at runtime

---

## 2. Number Type

**Purpose**: Represents numeric values (integers, floats, decimals).

```typescript
let userAge = 28;  // TypeScript infers: number
```

**Key points**:
- TypeScript automatically infers type from initial value
- All numbers are the same type (no int/float distinction)
- Includes NaN, Infinity, -Infinity

---

## 3. Type Inference

**Purpose**: TypeScript automatically determines types without explicit annotations.

```typescript
let userAge = 28;              // Inferred as: number
let hobbies = ["Sports", "Cooking"];  // Inferred as: string[]
```

**Key points**:
- Works on initialization with values
- Reduces boilerplate code
- Use explicit annotations when clarity is needed

---

## 4. Function Parameter Types

**Purpose**: Explicitly declare types of function parameters.

```typescript
function add(a: number, b = 5) {
  return a + b;
}
```

**Key points**:
- Ensures functions receive correct argument types
- Default parameters provide fallback values
- Return type is inferred automatically

---

## 5. The `any` Type (Escape Hatch)

**Purpose**: Disables type checking for a variable.

```typescript
let age: any = 26;
age = "66";     // OK
age = false;    // OK
age = {};       // OK
```

**Key points**:
- Opt-out of type safety when needed
- Use for migrating legacy JavaScript
- **Danger**: Overusing `any` defeats TypeScript's purpose
- **Better alternative**: Use `unknown` instead for safety

---

## 6. Union Types

**Purpose**: Allow a value to be one of several types.

```typescript
let age: number | string;
age = 22;      // OK - number
age = "23";    // OK - string
// age = true; // Error - boolean not allowed
```

**Key points**:
- Syntax: `TypeA | TypeB | TypeC`
- Value can be any one of the specified types
- More flexible than single type, safer than `any`

---

## 7. Array Types

**Purpose**: Type-safe collections of values.

```typescript
let hobbies = ["Sports", "Cooking"];  // Inferred as: string[]
// hobbies.push(10); // Error - can't push number to string array

let users: Array<string | number>;  // Generic syntax
```

**Key points**:
- Two syntaxes: `Type[]` or `Array<Type>`
- Ensures all elements are the correct type
- Can use union types inside arrays

---

## 8. Generic Array Type

**Purpose**: Using generics for type-safe arrays.

```typescript
let users: Array<string | number>;
```

**Key points**:
- Generics enable reusable, type-safe code
- Syntax: `Array<T>` where T is a type parameter
- Equivalent to `(string | number)[]`

---

## 9. Tuple Types

**Purpose**: Fixed-length arrays with specific types at each position.

```typescript
let possibleResults: [number, string] = [1, "Usama"];
// possibleResults = [1, 1];        // Error - second must be string
// possibleResults = [1, "usama", -1]; // Error - can't have 3 elements
possibleResults = [2, "ali"];       // OK
```

**Key points**:
- Fixed length: exactly 2 elements
- Positional typing: first is number, second is string
- More type-safe than regular arrays for structured data

---

## 10. Object Type Annotations

**Purpose**: Define the shape/structure of an object.

```typescript
const userObject: {
  name: string;
  age: number;
  hobbies: string[];
  role: { name: string; permissions: string[] };
} = {
  name: "Usama",
  age: 26,
  hobbies: ["Sports", "Cooking"],
  role: { name: "Admin", permissions: ["read", "write"] },
};
```

**Key points**:
- Define object structure inline
- All properties must be present with correct types
- Nested objects supported
- Foundation of TypeScript's type system

---

## 11. Nested Object Types

**Purpose**: Objects within objects, each with type annotations.

```typescript
role: { name: string; permissions: string[] }
```

**Key points**:
- Hierarchical structure support
- Type safety at every level
- Enables modeling complex real-world data

---

## 12. Required Properties

**Purpose**: Object properties that must be present.

```typescript
const userObject: {
  name: string;      // Required
  age: number;       // Required
  hobbies: string[]; // Required
} = {
  name: "Usama",
  age: 26,
  // Missing hobbies would cause error
};
```

**Key points**:
- All properties in object type are required by default
- Compile-time enforcement prevents incomplete data

</details>

---

<details>
<summary>The `typeof` and `keyof` Operators</summary>

## JavaScript `typeof` (Runtime)

**Exists at runtime** - returns a string indicating the type of a value.

```javascript
typeof 42;        // "number"
typeof "hello";   // "string"
typeof true;      // "boolean"
```

**Purpose**: Runtime type checking

---

## TypeScript `typeof` (Compile-Time)

**Exists only at compile-time** - extracts the type of a variable.

```typescript
const username = "Alice";
type UsernameType = typeof username;  // string
```

**Purpose**: Type extraction and inference

**Key points**:
- Compile-time only, erased at runtime
- Returns TypeScript types, not strings
- Enables type reuse without duplication

---

## TypeScript `keyof` (Compile-Time)

**Exists only in TypeScript** - extracts a union of keys from an object type.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User;  // "id" | "name" | "email"
```

**Purpose**: Type-safe property access

**Key points**:
- Compile-time only, erased at runtime
- Returns union of literal types
- No JavaScript equivalent exists

</details>

---

<details>
<summary>Objects vs. Interfaces</summary>

## The Core Difference

Both use structural typing, but serve different purposes.

| Aspect | Object Types (Inline) | Interfaces |
|--------|----------------------|------------|
| **Definition** | Anonymous, defined inline | Named, declared separately |
| **Reusability** | ❌ Cannot be reused | ✅ Can be reused everywhere |
| **Extension** | ❌ Cannot be extended | ✅ Can extend other interfaces |
| **Implementation** | ❌ Cannot be implemented by classes | ✅ Can be implemented by classes |
| **Use Case** | One-off, simple types | Reusable, complex types |

---

## Object Types (Inline)

**When to use**:
- Single-use, simple types
- Function parameters that won't be reused
- Quick prototyping

**Limitations**:
- Cannot be reused
- Cannot be extended
- Cannot be implemented by classes

---

## Interfaces

**When to use**:
- Types used in multiple places
- Domain concepts (User, Product, Order)
- Need to extend or build upon the type
- Class implementation required
- Public APIs and libraries

**Advantages**:
- Reusability: Define once, use everywhere
- Extensibility: Can extend other interfaces
- Class implementation: Classes can implement interfaces
- Better error messages and documentation

</details>

---

<details>
<summary>Type Categories and Shape-Based Checking</summary>

## The Spectrum

TypeScript's type system operates on a spectrum from **value equality** to **structural shape**:

```
Primitive Types          Compound Types           Object Types
(string, number)    →    (arrays, tuples)    →    (objects, interfaces)
   ↓                         ↓                        ↓
Value equality          Structural shape         Structural shape
"Must BE this"         "Must HAVE this"         "Must HAVE this"
```

## Type Categories

| Type Category | Examples | Shape-Based? | What It Checks |
|---------------|----------|--------------|----------------|
| **Primitives** | string, number, boolean | ❌ No | Exact type match |
| **Array** | string[], number[] | ✅ Yes | Collection structure |
| **Tuple** | [number, string] | ✅ Yes | Fixed-length, typed positions |
| **Function** | (x: number) => string | ✅ Yes | Call signature structure |
| **Object** | { name: string } | ✅ Yes | Property structure |
| **Interface** | interface User { ... } | ✅ Yes | Property structure |
| **Union** | string \| number | ✅ Yes | One of several shapes |
| **Intersection** | A & B | ✅ Yes | Combined shapes |

**Note**: Primitive types are value-based (not shape-based). All other types use structural/shape-based checking.

</details>

---

<details>
<summary>When to Use TypeScript</summary>

## Use TypeScript When:

1. **Large-Scale Applications** (10,000+ lines, multiple modules)
2. **Team Collaboration** (2+ developers)
3. **Long-Term Projects** (6+ months lifespan)
4. **Public Libraries / npm Packages**
5. **Complex Domain Logic**
6. **Critical Systems** (finance, healthcare, auth)
7. **Learning Modern JavaScript/Frameworks**

## JavaScript Might Be Sufficient When:

1. **Small Scripts** (< 1,000 lines, one-off tasks)
2. **Rapid Prototyping** (MVPs, hackathons, POCs)
3. **Learning Basics** (first 1-3 months of programming)
4. **Very Small Projects** (personal blogs, single-use tools)

## Decision Framework

| Lines of Code | Developers | Lifespan | Recommendation |
|---------------|------------|----------|----------------|
| < 1,000 | 1 | < 3 months | JavaScript OK |
| 1,000 - 5,000 | 1-2 | 3-6 months | TypeScript beneficial |
| 5,000 - 20,000 | 2-5 | 6-12 months | TypeScript recommended |
| 20,000+ | 5+ | 12+ months | TypeScript essential |

</details>

---

<details>
<summary>Key Concepts Mastered</summary>

## 1. Type Safety
TypeScript ensures variables contain only specified types, catching errors at compile time.

## 2. Type Inference
TypeScript automatically determines types from values, reducing boilerplate while maintaining safety.

## 3. Structural Typing
TypeScript cares about the shape (structure) of objects, not their names or declarations.

## 4. Compile-Time vs. Runtime
All type annotations exist only during development. They're removed before code runs.

## 5. Type Erasure
Types are completely removed before runtime, resulting in zero runtime overhead.

## 6. Gradual Adoption
TypeScript can be added to existing JavaScript incrementally.

</details>

---

<details>
<summary>Key Takeaways</summary>

1. **TypeScript = JavaScript + Static Types**
2. **Types are compile-time only** - erased before runtime
3. **Structural typing** - TypeScript checks shapes, not nominal types
4. **Catches bugs early** - during development, not production
5. **Zero runtime cost** - output is pure JavaScript
6. **Gradual adoption** - can be added to existing JavaScript incrementally
7. **Industry standard** - used by Microsoft, Google, Airbnb, Slack, and most modern frameworks
8. **Interfaces vs. Objects** - Use interfaces for reusable types, inline objects for one-offs
9. **Type erasure** - Types exist only during development, completely removed at runtime
10. **Investment pays off** - initial learning curve is outweighed by long-term benefits

</details>

---

<details>
<summary>Next Steps</summary>

- Learn about type aliases (alternative to interfaces)
- Explore functions and their type signatures in depth
- Practice with generics for reusable, type-safe code
- Master utility types (Partial, Required, Readonly, Pick, Omit)
- Understand type guards and type narrowing
- Learn about advanced types (conditional types, mapped types)

</details>

---

*For the complete TypeScript fundamentals overview, see [Get-started/README.md](../Get-started/README.md)*