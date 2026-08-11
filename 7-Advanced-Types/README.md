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
