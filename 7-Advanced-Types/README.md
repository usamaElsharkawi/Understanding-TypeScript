# Advanced Types - Lecture Documentation

## Course Structure
- **88**: Module Introduction
- **89**: Intersection Types
- **90**: More on Type Guards
- **91**: Discriminated Unions
- **92**: Type Guards via "instanceof"
- **93**: "Outsourcing" Type Guards & Using Type Predicates
- **94**: Function Overloads
- **95**: Working with Function Overloads
- **96**: Making Sense of Index Types
- **97**: Constant Types with "as const"
- **98**: Revisiting the "Record" Type
- **99**: The "satisfies" Keyword

## Lecture 88: Module Introduction
Welcome to the Advanced Types section! This part of the course dives deeper into TypeScript's powerful type system. We'll explore how to combine types, protect against runtime errors with type guards, create flexible function signatures with overloads, and leverage modern TypeScript keywords like `as const` and `satisfies`. These tools will help you write safer, more expressive, and more flexible TypeScript code.

## Lecture 89: Intersection Types
Intersection types combine multiple types into one — the resulting type has **all** properties and methods of every type in the intersection.

### Syntax
```typescript
type A = { name: string };
type B = { age: number };
type C = A & B; // { name: string; age: number }
```

### Intersection vs. Union
| Type | Meaning |
|------|---------|
| `A \| B` (Union) | Value is **either** A **or** B |
| `A & B` (Intersection) | Value is **both** A **and** B (all properties combined) |

### Key Nuances

#### 1. Works with any combination of types
Intersections work identically with `type` aliases, `interface`s, and inline object types:
```typescript
type Person = { name: string; age: number };
type Employee = { jobTitle: string; salary: number };
type Admin = Person & Employee; // Combines both

interface PersonI { name: string; age: number }
interface EmployeeI { jobTitle: string; salary: number }
type AdminI = PersonI & EmployeeI; // Works the same way

type Mixed = Person & EmployeeI & { clearanced: boolean }; // Mix types and interfaces
```

#### 2. `&` vs `extends` — conceptual difference
- `type Admin = Person & Employee` — creates a new anonymous type combining existing types without modifying originals
- `interface Admin extends Person, Employee` — creates a new named interface that **inherits** from multiple (and can be merged later via declaration merging)

```typescript
interface Person { name: string }
interface Employee { jobTitle: string }

interface Admin extends Person, Employee {
  startDate: Date; // Can add new properties
}
// Declaration merging:
interface Admin { clearanced: boolean; } // ✅ Allowed
```

#### 3. Primitive intersections = `never`
Intersecting incompatible primitives is logically impossible — the result is `never`:
```typescript
type Impossible = string & number; // type Impossible = never
let x: Impossible; // Can never have a value
x = "hello"; // ❌ Error: Type 'string' is not assignable to type 'never'
```

#### 4. Intersection of function types
Two function types can be intersected to create a type satisfying both signatures simultaneously:
```typescript
type StringHandler = (input: string) => void;
type NumberHandler = (input: number) => void;
type DualHandler = StringHandler & NumberHandler;

const handler: DualHandler = (input: string | number) => {
  console.log(input.toString());
}; // ✅ Satisfies both signatures
```
> **Note**: This differs from interface call signatures, which create **overloads** (callable with A **or** B), not an intersection (satisfy A **and** B simultaneously).

#### 5. Composable "mixin" types (real-world use case)
Intersection types excel at composing reusable "base" or "mixin" types:
```typescript
type Timestamped = { createdAt: Date; updatedAt: Date };
type Identifiable = { id: string };

type User = Identifiable & Timestamped & { name: string; email: string };
type Product = Identifiable & Timestamped & { title: string; price: number };
type Order = Identifiable & Timestamped & { items: string[]; total: number };
// All share id, createdAt, updatedAt — defined once, reused everywhere
```

## Lecture 90: More on Type Guards

**Type guards** allow you to **narrow** a type at runtime — when a condition is true, TypeScript understands the value is a specific type, enabling safe property access.

### Common Type Guard Patterns

#### 1. `typeof` — for primitive types
```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // ✅ TypeScript knows: string
  }
  return value.toFixed(2); // ✅ TypeScript knows: number
}
```

#### 2. `typeof` cannot distinguish between different object/class types
> **Note**: `typeof` *does* work on objects — it returns `"object"` for all objects/classes. But because `typeof new Person()` and `typeof new Place()` both return `"object"`, it provides **no useful information** for distinguishing between them.

```typescript
class Person {
  name = "usama";
  walk() {}
}
class Place {
  location = "Cairo";
  visit() {}
}

function use(p: Person | Place) {
  if (typeof p === "object") {
    // p is still Person | Place — can't access .walk() or .visit()
  }
}
```

**Use `instanceof` for classes instead:**
```typescript
function use(p: Person | Place) {
  if (p instanceof Person) {
    p.walk(); // ✅ TypeScript narrows to Person
  } else {
    p.visit(); // ✅ TypeScript narrows to Place
  }
}
```

#### 3. `in` operator — checks property existence on union members
```typescript
type FileSource = { path: string };
type DBSource = { connectionUrl: string };
type Source = FileSource | DBSource;

function loadData(source: Source) {
  if ("path" in source) {
    // source is narrowed to FileSource
    console.log("Opening file:", source.path);
  } else {
    // source is narrowed to DBSource
    console.log("Connecting to DB:", source.connectionUrl);
  }
}
```

#### 4. `Array.isArray()` — for array type guards
```typescript
function processItems(items: string | string[]) {
  if (Array.isArray(items)) {
    // items is narrowed to string[]
    items.map(i => console.log(i));
  } else {
    // items is narrowed to string
    console.log(items);
  }
}
```

#### 5. Literal type checks for string/number unions
```typescript
type Status = "success" | "error";
function handle(s: Status) {
  if (s === "success") {
    // s is narrowed to "success"
  } else {
    // s is narrowed to "error"
  }
}
```

### Key Takeaway
Type guards don't just **check conditions at runtime** — they also **communicate to TypeScript** which type branch you're in, giving you safe property access and proper autocomplete within each branch.

### Type Guard Reference Table
| Guard | Distinguishes |
|-------|--------------|
| `typeof x === "string"` | ✅ Primitives (`string`, `number`, `boolean`) |
| `typeof x === "object"` | ❌ Cannot distinguish different object/class types |
| `x instanceof Class` | ✅ Different class types |
| `"prop" in x` | ✅ Object types via property presence |
| `Array.isArray(x)` | ✅ Arrays vs. non-arrays |
| `x === "literal"` | ✅ String/number literal union members |

## Lecture 91: Discriminated Unions

A **discriminated union** (also called a "tagged union") is a union type where each member has a **common property** (the discriminant) with a **distinct literal type** as its value. This lets TypeScript **automatically narrow** the union.

### Structure & Syntax
```typescript
type LoadingState = { kind: "loading" };
type ErrorState = { kind: "error"; message: string };
type SuccessState = { kind: "success"; data: string };

type NetworkCard = LoadingState | ErrorState | SuccessState;
```

### Narrowing with a Switch Statement
```typescript
function renderCard(card: NetworkCard) {
  switch (card.kind) {
    case "loading":
      return "Loading..."; // ✅ TypeScript knows: LoadingState
    case "error":
      return `Error: ${card.message}`; // ✅ TypeScript knows: ErrorState
    case "success":
      return `Data: ${card.data}`; // ✅ TypeScript knows: SuccessState
  }
}
```

### Requirements for Discriminated Unions

1. **Same property name** across all union members (e.g., `kind`)
2. **Literal types** for the discriminant values (`"loading"`, `"error"`, `"success"`), **not** `string`
3. **Switch** or **if-else** that checks the discriminant property

### Real-World Example — Shape
```typescript
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Square = { kind: "square"; size: number };
type Shape = Circle | Rectangle | Square;

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2; // ✅ Circle
  } else if (shape.kind === "rectangle") {
    return shape.width * shape.height; // ✅ Rectangle
  } else {
    return shape.size ** 2; // ✅ Square (TypeScript knows it's the only remaining case)
  }
}
```

### Benefits
- **Type safety** — TypeScript narrows correctly in each branch
- **Error prevention** — TypeScript can warn if you forget a case
- **Autocomplete** — Only relevant properties appear within each branch
- **No manual type assertions** — the narrowing is automatic

### Discriminated Unions vs. Type Guards (`in` operator)
| Feature | Discriminated Union | `in` Operator |
|---------|-------------------|---------------|
| Discriminant | Common property (e.g., `kind`) | Any property existence check |
| Literal values required | ✅ Yes | ❌ No |
| TypeScript narrowing | ✅ Automatic via switch/if-else | ✅ Automatic via `in` |
| Declaration merging | ❌ Not applicable | ❌ Not applicable |

### Code Demo (in `src/discriminated.ts`)
We implemented two examples:
1. **`NetworkCard`** — loading / error / success states with a switch statement
2. **`Shape`** — circle / rectangle / square with an if-else chain

## Lecture 92: Type Guards via `instanceof`

The `instanceof` operator checks whether an object is an **instance of a class**, and TypeScript uses it as a **type guard** to narrow union types of class instances.

### Basic Usage
```typescript
class User {
  name = "usama";
  greet() { console.log("Hello!"); }
}

class Admin {
  role = "admin";
  manage() { console.log("Managing..."); }
}

function use(user: User | Admin) {
  if (user instanceof User) {
    user.greet(); // ✅ TypeScript narrows to User
  } else {
    user.manage(); // ✅ TypeScript narrows to Admin
  }
}
```

### How It Works
- `instanceof` checks the object's prototype chain at runtime
- When used in an `if`/`else`, TypeScript **narrows** the type to the class on the right side
- In the `else` branch, TypeScript infers the **remaining** union member

### `instanceof` vs. `typeof` vs. `in`

| Operator | Works On | Narrows To | Use Case |
|---------|----------|------------|----------|
| `typeof` | Primitives only | `"string"`, `"number"`, etc. | Primitive type checks |
| `in` | Property existence | Any object with that property | Union members without shared discriminant |
| `instanceof` | **Classes only** | The specific class instance | Class-based unions |

### Why `typeof` Fails for Classes
```typescript
class User {}
class Admin {}

function use(user: User | Admin) {
  if (typeof user === "object") {
    // ❌ Still User | Admin — both classes return "object"
    user.greet();  // ❌ Error!
    user.manage(); // ❌ Error!
  }
}
```

### Class Hierarchies (Inheritance)
`instanceof` works correctly with inherited classes — TypeScript narrows to the **class itself**, and you can still access **inherited properties/methods** from parent classes:

```typescript
class Animal {
  eat() { console.log("Eating..."); }
}

class Dog extends Animal {
  bark() { console.log("Woof!"); }
}

class Cat extends Animal {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // ✅ Dog
    animal.eat();  // ✅ Inherited from Animal
  } else {
    animal.meow(); // ✅ Cat
    animal.eat();  // ✅ Inherited from Animal
  }
}
```

### Code Demo (in `src/instanceof.ts`)
We implemented:
1. **`User` / `Admin`** classes with different methods, narrowed via `instanceof`
2. **`Animal` → `Dog` / `Cat`** hierarchy, demonstrating that inherited methods are still accessible after narrowing

## Lecture 93: "Outsourcing" Type Guards & Using Type Predicates

**Type predicates** let you write **custom, reusable type guard functions** that TypeScript can use to narrow types — this is the idea of "outsourcing" type guards.

### The Problem — Repeated Type Checks

If you need to narrow a type in multiple places, you repeat yourself:

```typescript
type Source = { type: "file"; path: string } | { type: "db"; connectionUrl: string };

function loadData(source: Source) {
  if (source.type === "file") { /* handle file */ }
}

function saveData(source: Source) {
  if (source.type === "file") { /* handle file */ }
}

function deleteData(source: Source) {
  if (source.type === "file") { /* handle file */ }
}
```

### The Solution: Type Predicates (`is`)

A **type predicate** has the syntax `paramName is Type`:

```typescript
function isFile(source: Source): source is FileSource {
  return source.type === "file";
}

function loadData(source: Source) {
  if (isFile(source)) {
    console.log(source.path); // ✅ TypeScript narrows to FileSource
  } else {
    console.log(source.connectionUrl); // ✅ TypeScript narrows to DBSource
  }
}
```

### How It Works
- **`source is FileSource`** tells TypeScript: "If this function returns `true`, the parameter is `FileSource`"
- The function still returns a **runtime `boolean`** — the predicate is a **compile-time hint**
- You can now use `isFile()` anywhere in your codebase

### Type Predicate Syntax
```typescript
function guardName(param: UnionType): param is NarrowedType {
  return /* runtime check */;
}
```

### Combining with `instanceof`
You can also create custom type guards for class-based unions:

```typescript
class User {
  constructor(public name: string) {}
  join() {}
}

class Admin {
  constructor(public permissions: string[]) {}
  scan() {}
}

type Entity = User | Admin;

function isAdmin(entity: Entity): entity is Admin {
  return entity instanceof Admin;
}

function init(entity: Entity) {
  if (isAdmin(entity)) {
    entity.scan(); // ✅ TypeScript narrows to Admin
  } else {
    entity.join(); // ✅ TypeScript narrows to User
  }
}
```

> **Note**: `isAdmin` uses `instanceof` as the runtime check, but returns a **type predicate** `entity is Admin` so TypeScript can narrow across function boundaries.

### Key Takeaways
1. **Outsource** your type-narrowing logic into reusable helper functions
2. Use **`: paramName is Type`** as the return type — NOT `boolean`
3. The predicate is a **compile-time hint** — the actual check still happens at runtime
4. Works for **any** type narrowing: discriminants, `in`, `typeof`, `instanceof`, etc.
5. Makes code cleaner and type narrowing **reusable and composable**

### Code Demo (in `src/guards.ts`)
We implemented:
1. **`isFile()`** — a custom type guard with `: source is FileSource` predicate
2. **`isAdmin()`** — a custom type guard wrapping `instanceof` as a reusable predicate
3. **`loadData()`** — using the custom guard to narrow `FileSource | DBSource`
4. **`init()`** — using `isAdmin()` to narrow `User | Admin`

## Lecture 94 & 95: Function Overloads

**Function overloads** allow you to define **multiple signatures** for a single function — each with different parameter types and return types. The actual implementation is shared by all signatures.

### The Problem — Loss of Type Safety

Without overloads, a flexible function loses precise return types:

```typescript
// ❌ Without overloads — return type is always the union
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  return Number(a) + Number(b);
}

const result = combine("Hello", "World"); // Type is string | number — not just string!
```

TypeScript can't tell that `combine("Hello", "World")` always returns a `string`.

### The Solution — Multiple Signatures

```typescript
// Overload signatures — what callers see:
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

// Implementation signature — hidden from callers:
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return a + b; // string concatenation
  }
  return Number(a) + Number(b); // numeric addition
}

// ✅ Correct return types based on arguments
const strResult = combine("Hello", "World"); // Type: string ✅
const numResult = combine(10, 20);           // Type: number ✅
// combine("Hello", 5); // ❌ Error: No matching overload
```

### Rules & Structure

1. **Multiple overload signatures** — each defines a valid call signature
2. **One implementation signature** — the actual logic (hidden from callers)
3. **Implementation must be compatible** with ALL overload signatures
4. **Overload signatures must come before** the implementation

### Real-World Example — Flexible Getter

```typescript
function get<T>(obj: T[], index: number): T;
function get<T>(obj: Record<string, T>, key: string): T;
function get<T>(obj: T[] | Record<string, T>, key: string | number): T {
  return obj[key as keyof typeof obj] as T;
}

const scores = [98, 87, 92];
const firstScore = get(scores, 0); // ✅ Type: number

const userRoles = { alice: "admin", bob: "user" };
const aliceRole = get(userRoles, "alice"); // ✅ Type: string
```

### Key Takeaways
1. Overloads define **multiple valid call signatures** for one function
2. TypeScript uses the **first matching signature** for type inference
3. The **implementation signature** must handle all overload cases
4. Enables **precise return types** based on argument types
5. Callers get proper autocomplete for all valid signatures

### Code Demo (in `src/overloads.ts`)
We implemented:
1. **`combine()`** — overloaded function for `string | number` combinations
2. **`get<T>()`** — flexible getter overloaded for arrays and objects with `Record<string, T>`

## Lecture 96: Making Sense of Index Types

**Index types** let you type objects with **dynamic keys** — you specify the *shape* of the key-value pairs rather than naming each property explicitly. Essential for dynamic object access, utility functions, and API responses.

### 1. Index Signatures — Flexible Objects

```typescript
type StringDictionary = { [key: string]: string };

const dict: StringDictionary = {
  hello: "world",
  foo: "bar",
  // name: 42,  // ❌ Error — value must be string
};
```

**Numeric indexes** are also supported:
```typescript
type NumberArray = { [index: number]: string };
const names: NumberArray = ["usama", "max", "ola"]; // Like string[]
```

### 2. `keyof` Operator — Union of Keys

`keyof T` produces the **union of all property names** of type `T`:

```typescript
type Person = {
  name: string;
  age: number;
  email: string;
};

type PersonKeys = keyof Person;
// Equivalent to: "name" | "age" | "email"

const key: PersonKeys = "name"; // ✅
const bad: PersonKeys = "salary"; // ❌ Not a property of Person
```

### 3. Indexed Access Types — `T[K]`

You can **look up** a property type within another type:

```typescript
type NameType = Person["name"];         // string
type NameOrEmail = Person["name" | "email"]; // string

// Generic indexed access:
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### 4. Generic `pluck` Function — Putting It All Together

```typescript
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "usama", age: 34, email: "test@test.com" };
const name = pluck(person, "name"); // ✅ type: string
const age = pluck(person, "age");   // ✅ type: number
// pluck(person, "salary");        // ❌ Error — K must extend keyof T
```

### Key Takeaways
1. **Index signatures** (`[key: string]: T`) type objects with dynamic keys
2. **`keyof T`** returns the union of all property names of `T`
3. **Indexed access** `T[K]` retrieves the type of a property
4. **Generic constraints** (`K extends keyof T`) enable powerful utility functions like `pluck`
5. This is the foundation for utility types like `Partial`, `Pick`, `Record`, and `keyof`

### Code Demo (in `src/index-types.ts`)
We implemented:
1. **Index signature** — `StringDictionary` with `{ [key: string]: string }`
2. **`keyof` operator** — `PersonKeys` union type applied to a variable
3. **Indexed access types** — `Person["name"]` and `Person["name" | "email"]`
4. **Generic `pluck()` function** — type-safe property extraction from any object

## Lecture 97: Constant Types with `as const`

The `as const` assertion makes objects and arrays **read-only** and **narrows all properties to their exact literal types** — like putting `const` on every property of an object, deeply.

### Without `as const` — Widened Types

```typescript
const config = {
  url: "https://api.example.com", // type: string (widened)
  timeout: 5000,                  // type: number (widened)
  method: "GET",                  // type: string (widened)
};
```

### With `as const` — Literal Types

```typescript
const config = {
  url: "https://api.example.com", // type: "https://api.example.com" (literal!)
  timeout: 5000,                  // type: 5000 (literal!)
  method: "GET",                  // type: "GET" (literal!)
} as const;
```

### Arrays Become Readonly Tuples

```typescript
const colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"] — a tuple!
colors[0];        // type: "red" (literal, not string)
colors.push("yellow"); // ❌ Error — readonly array
```

### Combining with `typeof` + `keyof` for Union Types

```typescript
const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
} as const;

type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS];
// Equivalent to: "UP" | "DOWN" | "LEFT" | "RIGHT"

function move(direction: Direction): string {
  switch (direction) {
    case DIRECTIONS.UP:   return "Going up!";
    case DIRECTIONS.DOWN: return "Going down!";
    case DIRECTIONS.LEFT: return "Going left!";
    case DIRECTIONS.RIGHT:return "Going right!";
  }
}
```

### Function Return Types

```typescript
function getConfig() {
  return { endpoint: "https://api.example.com", retries: 3 } as const;
}
const cfg = getConfig();
// cfg.endpoint is "https://api.example.com" (literal type!)
```

### Key Takeaways
1. **`as const` makes everything read-only** — objects, arrays, and all nested structures
2. **Narrows to literal types** — instead of `string`, you get the exact string you wrote
3. **Arrays become `readonly` tuples** — more specific than regular arrays
4. **Enables exhaustive type checking** — when combined with `typeof` + `keyof`
5. **No runtime cost** — it's a compile-time-only assertion
6. **Useful for configuration objects** and **constant enums** patterns

### Code Demo (in `src/as-const.ts`)
We implemented:
1. **Object with `as const`** — showing properties narrow to literal types
2. **Array with `as const`** — demonstrating readonly tuple behavior
3. **`DIRECTIONS` constant** — using `typeof` + `keyof` to derive a union type
4. **`move()` function** — exhaustive switch over the derived union
5. **`getConfig()` function** — returning an `as const` object for literal return types
