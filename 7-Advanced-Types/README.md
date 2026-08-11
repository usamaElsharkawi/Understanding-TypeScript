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
