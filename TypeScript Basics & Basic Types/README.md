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
<summary>Enums (Enumerations)</summary>

## What Are Enums?

**Enums allow you to define a set of named constants.**

## Your Example

```typescript
enum useRole {
    ADMIN,   // 0
    USER,    // 1
    GUEST    // 2
}
```

## Key Points

- **Numeric enums** (default): Auto-increment from 0
- **String enums**: More readable, better for debugging
- **Compile to JavaScript**: Not erased like types
- **Bidirectional mapping**: `useRole.ADMIN` = 0, `useRole[0]` = "ADMIN"

## When to Use

- Fixed sets of related constants
- Replacing magic numbers
- State machines
- API response codes

## Modern Alternative

**Literal type unions** are often preferred (zero runtime cost):

```typescript
type Role = "admin" | "user" | "guest";
```

</details>

---

<details>
<summary>Literal Types</summary>

## What Are Literal Types?

**Literal types specify exact values a variable can hold.**

## String Literal Types

```typescript
type Status = "success" | "error" | "loading";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
```

## Numeric Literal Types

```typescript
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
type HttpStatus = 200 | 404 | 500;
```

## Key Points

- Specify exact values, not just general types
- Zero runtime overhead (erased at compile-time)
- Enable discriminated unions
- Better alternative to enums for simple cases
- Provide autocomplete and type safety

## Common Use Cases

- HTTP methods
- Status values
- Configuration options
- Event types
- State machines

</details>

---

<details>
<summary>Function Return Types</summary>

## The Three Special Return Types

### 1. `number` (or any type) - Returns a value

```typescript
function add2(a: number, b: number): number {
    return a + b;
}
```

**Meaning**: Function returns a value of this type

---

### 2. `void` - Returns nothing

```typescript
function log(message: string): void {
    console.log(message);
}
```

**Meaning**: Function performs an action but returns nothing

---

### 3. `never` - Never returns

```typescript
function throwError(message: string): never {
    throw new Error(message);
}
```

**Meaning**: Function always throws or runs forever

---

## Comparison

| Return Type | Returns Value? | Function Completes? |
|-------------|----------------|---------------------|
| `number` | ✅ Yes | ✅ Yes |
| `void` | ❌ No | ✅ Yes |
| `never` | ❌ Never | ❌ Never |

</details>

---

<details>
<summary>Functions as Types</summary>

## What Are Function Types?

**Function types describe the shape of a function** - parameters and return type.

## Syntax

```typescript
(param1: Type1, param2: Type2) => ReturnType
```

## Example

```typescript
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
```

## Common Use Cases

- **Callbacks**: Pass functions as arguments
- **Event handlers**: Type-safe event handling
- **Higher-order functions**: Functions that return functions
- **Middleware**: Chain of functions

## Example: Callback

```typescript
type Callback = (item: string) => void;

function processItems(items: string[], callback: Callback): void {
  items.forEach(callback);
}
```

</details>

---

<details>
<summary>The `unknown` Type</summary>

## What Is `unknown`?

**Type-safe alternative to `any`.** Means "I don't know the type, but I'll check before using."

## The Problem with `any`

```typescript
let data: any = getData();
data.toUpperCase();  // ✓ Compiles (but might crash!)
```

**`any` disables all type checking.**

## The Solution: `unknown`

```typescript
let data: unknown = getData();
// data.toUpperCase();  // ✗ ERROR: Must check type first

if (typeof data === "string") {
  console.log(data.toUpperCase());  // ✓ Safe
}
```

**`unknown` forces you to validate before using.**

## When to Use

- Receiving data from external sources (APIs, JSON)
- Working with untyped JavaScript libraries
- You truly don't know the type

## Best Practice

**Use `unknown` instead of `any`** for better type safety.

</details>

---

<details>
<summary>Optional Values (`?`)</summary>

## What Are Optional Values?

**Properties or parameters that may or may not be present**, marked with `?`.

## Optional Properties

```typescript
interface User {
  id: number;
  name: string;
  email?: string;  // Optional - may be missing
  age?: number;    // Optional - may be missing
}
```

## Usage

```typescript
const user1: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30
};

const user2: User = {
  id: 2,
  name: "Bob"
  // email and age are missing - OK!
};
```

## Optional Parameters

```typescript
function greet(name: string, greeting?: string) {
  console.log(`${greeting || "Hello"}, ${name}`);
}

greet("Alice");        // "Hello, Alice"
greet("Bob", "Hi");    // "Hi, Bob"
```

## Key Points

- Use `?` after property/parameter name
- Type becomes `Type | undefined`
- Useful for API responses, configs, forms
- Access with `??` for defaults

</details>

---

<details>
<summary>Nullish Coalescing (`??`)</summary>

## What Is It?

**Operator that provides a default value when a value is `null` or `undefined`.**

## Syntax

```typescript
value ?? defaultValue
```

## How It Works

```typescript
const value1 = null ?? "default";        // "default"
const value2 = undefined ?? "default";   // "default"
const value3 = "" ?? "default";          // "" (empty string is NOT nullish)
const value4 = 0 ?? "default";           // 0 (zero is NOT nullish)
const value5 = false ?? "default";       // false (false is NOT nullish)
```

## Comparison: `??` vs. `||`

```typescript
// Using || (old way) - treats 0, "", false as "no value"
const count1 = 0 || 10;     // 10 (WRONG!)

// Using ?? (new way) - only null/undefined
const count2 = 0 ?? 10;     // 0 (CORRECT!)
```

## When to Use

- Providing defaults for optional values
- Configuration objects
- Form inputs
- API responses

## Best Practice

**Use `??` instead of `||` for defaults** to preserve valid values like `0`, `""`, and `false`.

</details>

---

<details>
<summary>Type Casting (Type Assertion)</summary>

## What Is It?

**Telling TypeScript: "Trust me, I know what type this value is."**

## Syntax

```typescript
// Preferred
value as Type

// Alternative
<Type>value
```

## Example

```typescript
let data: any = { id: 1, name: "Alice" };

// Tell TypeScript: "This is a User"
interface User {
  id: number;
  name: string;
}

const user = data as User;
console.log(user.name);  // "Alice"
```

## When to Use

- Working with `any` or `unknown`
- DOM manipulation
- JSON parsing
- JavaScript library interop

## Important Warnings

- **Type casting doesn't convert** - it just asserts
- **TypeScript trusts you** - no runtime check
- **Use sparingly** - it bypasses type safety
- **Prefer type guards** for validation

## Type Casting vs. Type Guards

**Type casting**: "This is a User" (no check)
**Type guards**: "Let me verify this is a User" (with check)

</details>

---

<details>
<summary>The `{}` Type Edge Case</summary>

## What Is `{}`?

**Not "any object" as you might think.** It means "any non-null, non-undefined value."

## What It Accepts

```typescript
let val: {};

val = "text";      // ✓ String
val = 42;          // ✓ Number
val = true;        // ✓ Boolean
val = {};          // ✓ Object
val = [];          // ✓ Array

// val = null;     // ✗ ERROR
// val = undefined; // ✗ ERROR
```

## Comparison with `object`

```typescript
let val1: {} = "text";      // ✓ OK (primitives allowed)
let val2: object = "text";  // ✗ ERROR (primitives not allowed)
```

- `{}` = any non-null/undefined value (includes primitives)
- `object` = non-primitive values only

## Why It Exists

Historical quirk of TypeScript. Rarely the right choice - prefer `unknown` or specific types.

</details>

---

<details>
<summary>The `Record` Type</summary>

## What Is `Record<K, V>`?

**Utility type that creates an object with keys of type `K` and values of type `V`.**

## Syntax

```typescript
type Record<K extends keyof any, V> = {
  [P in K]: V;
};
```

## Example

```typescript
// Record where keys are strings, values are numbers
type Scores = Record<string, number>;

const scores: Scores = {
  "Alice": 95,
  "Bob": 87,
  "Charlie": 92
};
```

## Key Points

- **Yes, it's key-value pairs** (that's what objects are)
- Keys are flexible (any string/number)
- Values are strict (must match type)
- Perfect for dictionaries, maps, configs

## Common Use Cases

- Dictionaries: `Record<string, string>`
- Configuration: `Record<string, string | number | boolean>`
- API mappings: `Record<number, User>`

</details>

---

<details>
<summary>Type Categories and Shape-Based Checking</summary>

## The Spectrum

TypeScript's type system operates on a spectrum:

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

**Note**: Primitive types are value-based. All other types use structural/shape-based checking.

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

## 7. Literal Types
Specify exact values a variable can hold (e.g., `"admin" | "user" | "guest"`).

## 8. Enums
Define sets of named constants (numeric or string values).

## 9. Type Casting
Tell TypeScript "trust me, I know the type" using `as` or `<>` syntax.

## 10. Unknown Type
Type-safe alternative to `any` that forces validation before use.

## 11. Optional Values
Properties/parameters that may be missing, marked with `?`.

## 12. Nullish Coalescing
Provide defaults only for `null`/`undefined` using `??` operator.

## 13. Module Scope
Each file is its own scope when using proper module configuration.

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
11. **Use `unknown` over `any`** for better type safety
12. **Use `??` over `||`** for nullish defaults
13. **Literal types over enums** for simple cases (zero runtime cost)
14. **Type casting is an escape hatch** - use type guards when possible
15. **Modules prevent scope conflicts** - always use proper module configuration

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
- Study type inference and contextual typing
- Explore decorators and metadata reflection

</details>

---

*For the complete TypeScript fundamentals overview, see [Get-started/README.md](../Get-started/README.md)*