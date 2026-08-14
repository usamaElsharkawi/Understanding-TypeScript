# Section 10: Deriving Types From Types

## Course Structure

- **118.** Module Introduction ✅
- **119.** Using "typeof" ✅
- **120.** "typeof" & A More Useful Example ✅
- **121.** Another Great Use-case for "typeof" ✅
- **122.** Extracting Keys with "keyof" ✅
- **123.** "keyof" & A More Useful Example ✅
- **124.** Understanding Indexed Access Types ✅
- **125.** Accessing Array Elements with Indexed Access Types ✅
- **126.** Introducing Mapped Types ✅
- **127.** Readonly Types & Optional Mapping ✅
- **128.** Exploring Template Literal Types ✅
- **129-132.** Advanced Type Features (Conditional Types, Infer, Utility Types) ✅

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

---

## Lecture 124: Understanding Indexed Access Types

### Overview
Indexed Access Types allow us to **extract the type of a specific property** from a type or interface using the syntax `Type[Key]`. This is a powerful feature for creating reusable, type-safe code without duplicating type definitions.

### What Are Indexed Access Types?

They let you look up the type of a property **by its name** within a type definition.

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

// Extract specific property types
type UserName = User["name"];    // type UserName = string
type UserAge = User["age"];      // type UserAge = number
type UserEmail = User["email"];  // type UserEmail = string
```

---

### Extracting Multiple Property Types

You can use **union types** as index keys:

```typescript
interface User {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
}

// Extract multiple properties
type NameOrAge = User["name" | "age"];
// Result: string | number

type AllUserTypes = User[keyof User];
// keyof User = "name" | "age" | "email"
// Result: string | number | boolean
```

---

### Working with Arrays

Extract the type of array elements using `[number]`:

```typescript
interface TodoList {
  todos: {
    id: number;
    text: string;
    completed: boolean;
  }[];
}

// Extract the array type
type Todos = TodoList["todos"];
// Result: { id: number; text: string; completed: boolean }[]

// Extract the element type
type Todo = TodoList["todos"][number];
// Result: { id: number; text: string; completed: boolean }

// Alternative syntax:
type TodoAlt = TodoList["todos"][number];
// Same result: { id: number; text: string; completed: boolean }
```

---

### Practical Example from Our Code

```typescript
type AppUser = {
  name: string;
  age: number;
  permissions: {
    id: string;
    title: string;
    description: string;
  }[];
};

// Extract nested property type
type Perms = AppUser["permissions"];
// Result: { id: string; title: string; description: string }[]

// Extract array element type
type Perm = Perms[number];
// Result: { id: string; title: string; description: string }

// One-step extraction:
type PermDirect = AppUser["permissions"][number];
// Same result: { id: string; title: string; description: string }
```

---

### Nested Indexed Access

You can chain indexed access types for deeply nested types:

```typescript
type AppUser = {
  name: string;
  permissions: {
    id: string;
    title: string;
    description: string;
  }[];
};

// Extract specific nested property type
type PermissionId = AppUser["permissions"][number]["id"];
// Result: string

type PermissionTitle = AppUser["permissions"][number]["title"];
// Result: string
```

---

### Comparison with `keyof`

| Feature | `keyof` | Indexed Access (`Type[Key]`) |
|---------|---------|------------------------------|
| Input | A type | A type + a key |
| Output | Union of keys | Type of specific property |
| Use case | Get all valid keys | Get the type of a specific key |

```typescript
interface User {
  name: string;
  age: number;
}

type Keys = keyof User;                // "name" | "age"
type NameType = User["name"];          // string
type AgeType = User["age"];            // number
```

---

### Type-Safe Property Access with Indexed Access

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

function getProductProperty<K extends keyof Product>(
  product: Product,
  key: K
): Product[K] {
  return product[key];
}

const laptop = { id: 1, name: "Laptop", price: 999 };

const id = getProductProperty(laptop, "id");     // type: number
const name = getProductProperty(laptop, "name"); // type: string
// getProductProperty(laptop, "xyz");            // ❌ Error: "xyz" not a key
```

---

### With `typeof` Values

```typescript
const user = {
  name: "Alice",
  age: 30,
  isActive: true
};

// Derive type from value, then extract property types
type UserType = typeof user;

type UserName = typeof user["name"];     // string
type UserAge = typeof user["age"];       // number
type UserStatus = typeof user["isActive"]; // boolean
```

---

### Key Differences from `typeof` and `keyof`

| Feature | Input | Output |
|---------|-------|--------|
| `typeof value` | Runtime value | Type |
| `keyof Type` | Compile-time type | Union of keys |
| `Type["key"]` | Type + key | Specific property type |

---

### Common Patterns

#### Pattern 1: Extract and Reuse
```typescript
interface ApiResponse {
  users: {
    id: number;
    username: string;
  }[];
}

// Reuse the extracted type
type User = ApiResponse["users"][number];
type UserId = User["id"];

function handleUser(user: User): UserId {
  return user.id;
}
```

#### Pattern 2: Generic Function with Indexed Access
```typescript
// Works with ANY object type!
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
const names = pluck(users, "name");  // Returns: string[]
const ages = pluck(users, "age");    // Returns: number[]
```

---

### Key Takeaways

1. **Indexed Access Types** (`Type["key"]`) extract specific property types from a type
2. **Array element access**: Use `[number]` to get the type of array elements
3. **Nested access**: Chain multiple `[]` for deeply nested types
4. **Multi-key access**: `Type["key1" | "key2"]` extracts union of multiple property types
5. **Combined with `keyof`**: `Type[keyof Type]` gives union of all property value types
6. **Compile-time only** - no runtime overhead
7. **Enables patterns like `pluck<T, K>`** for type-safe array property extraction
8. **Auto-updates when source types change** - no manual maintenance needed

---

## Lecture 125: Accessing Array Elements with Indexed Access Types

### Overview
This lecture focuses on using indexed access types to **extract types from array elements**. We learn how `Type[number]` syntax gives us the type of elements inside arrays, which is crucial for type-safe array operations.

### The Core Concept: `Array[number]`

```typescript
const numbers = [1, 2, 3, 4, 5];

type NumberArray = typeof numbers;
//     ^? number[]

type ElementType = NumberArray[number];
//     ^? number
```

| Expression | Meaning | Result |
|------------|---------|--------|
| `typeof numbers` | Get type from value | `number[]` |
| `NumberArray[number]` | Get element type at numeric index | `number` |

---

### Why `[number]` Works for Arrays

In TypeScript, `[number]` extracts the **element type** from any array type:

```typescript
type StringArray = string[];
type StringElement = StringArray[number];  // string

type NumberArray = number[];
type NumberElement = NumberArray[number];  // number
```

---

### Extracting from Object Array Properties

```typescript
type TodoList = {
  todos: {
    id: number;
    text: string;
    tags: string[];
  }[];
};

// Extract the todo object type
type Todo = TodoList["todos"][number];
// Result: { id: number; text: string; tags: string[] }

// Extract the tags array element type
type Tag = Todo["tags"][number];
// Result: string
```

---

### Nested Array Access

For multi-dimensional arrays, chain multiple `[number]`:

```typescript
type Matrix = {
  grid: number[][][];  // 3D array
};

type Layer1 = Matrix["grid"];                        // number[][][]
type Layer2 = Matrix["grid"][number];               // number[][]
type Layer3 = Matrix["grid"][number][number];       // number[]
type Layer4 = Matrix["grid"][number][number][number]; // number
```

---

### Practical Example: API Response Handling

```typescript
interface ApiResult {
  data: {
    userId: number;
    posts: {
      id: number;
      title: string;
      content: string;
    }[];
  }[];
}

// Extract types for easier use:
type UserData = ApiResult["data"][number];      // { userId: number; posts: {...}[] }
type Post = UserData["posts"][number];          // { id: number; title: string; content: string }

// Now use them safely:
function processPost(post: Post) {
  post.title;   // string (type-safe!)
  post.content;  // string (type-safe!)
}
```

---

### Common Patterns

#### Pattern 1: Extract Element Type from Array
```typescript
type StringArray = string[];
type StringElement = StringArray[number];  // string

type NumberArray = number[];
type NumberElement = NumberArray[number];  // number
```

#### Pattern 2: Extract from Nested Arrays
```typescript
interface Data {
  matrix: number[][];
}

type Matrix = Data["matrix"];                    // number[][]
type Row = Data["matrix"][number];              // number[]
type Cell = Data["matrix"][number][number];     // number
```

#### Pattern 3: Extract Object Keys from Array Elements
```typescript
interface UserList {
  users: {
    name: string;
    age: number;
    role: "admin" | "user";
  }[];
}

// Get the user object type
type User = UserList["users"][number];
// { name: string; age: number; role: "admin" | "user" }

// Get specific keys
type UserName = User["name"];      // string
type UserRole = User["role"];      // "admin" | "user"
```

---

### Key Takeaways

1. **`Type[number]`** extracts the element type from any array type
2. **Chain multiple `[number]`** for multi-dimensional arrays
3. **Combine with other indexed access types** for complex nesting
4. **Extract once, reuse everywhere** - avoids type duplication
5. **Works with tuples, arrays, and arrays of objects**
6. **Enables type-safe generic functions** like `pluck`, `firstElement`
7. **Auto-syncs with source types** - no manual maintenance**
3. **Key Takeaways for Lecture 126**

1. **Mapped types iterate over object properties**
2. **Syntax**: `{ [Key in keyof T]: Transformation }`
3. **`keyof` provides the keys to iterate**
4. **Built-in types**: `Partial`, `Readonly`, `Pick`, `Record`
5. **Practical use cases**: partial updates, readonly views, type transformations
6. **No runtime code** - all transformations happen at compile time

---

## Lecture 127: Readonly Types & Optional Mapping

### Overview
This lecture focuses on two essential modifiers in mapped types: `readonly` and `?`. These modifiers give you fine-grained control over how types are transformed.

### Readonly Modifier

The `readonly` modifier makes properties immutable:

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

**Example 1**: Making properties readonly
**Example 2**: Combining with optional mapping:
```typescript
type ImmutablePartial<T> = {
  readonly [P in keyof T]?: T[P];
};
```

**Example 3**: Removing readonly with `-`:
```typescript
type Mutable<T> = {
  -[readonly] [P in keyof T]: T[P];
};
```

### Practical Examples

**Form handling**:
```typescript
interface UserForm { name: string; email: string; }
type FormState = Partial<UserForm> & { submit: () => void; };
```

**API response handling**:
```typescript
interface APIResponse { data: any; error: string | null; loading: boolean; }
type ReadAPIResponse = Readonly<APIResponse>;
```

### Key Takeaways for Lecture 127

1. **`readonly` modifier** prevents property modification
2. **`?` modifier** makes properties optional
3. **Both are used in mapped types** for type transformation
4. **Common utilities**: `Readonly<T>`, `Partial<T>`
5. **Real-world applications**: forms, validation, API responses
6. **Modifiers can be combined** to create sophisticated types
7. **Understanding these is key** to advanced TypeScript patterns
---

## Lecture 128: Exploring Template Literal Types

### Overview
Template literal types are **one of TypeScript's most powerful features** for string manipulation at the **type level**. They let you create new types by combining string patterns using template syntax.

### Basic Syntax

```typescript
type TPipeline = `${T} Pipeline`;
```

This creates a new string literal type that combines values with templates - similar to string interpolation but at compile time.

### Simple Examples

```typescript
type EventName = `click` | `hover` | `focus`;
type Action = `${EventName} ${string}`;

// Valid examples:
type Valid1 = "click button";     // ✅ Matches pattern
type Valid2 = "hover mouse";      // ✅ Matches pattern
type Valid3 = "focus input";      // ✅ Matches pattern

// Invalid - doesn't match any event:
// type Invalid = "scroll";       // ❌ Error!
```

### String Literal Type Manipulation

#### Extract File Extension
```typescript
type GetExtension<T extends string> = 
  T extends `${string}.${infer Ext}` ? Ext : never;

type Ext1 = GetExtension<"document.md">;  // "md"
type Ext2 = GetExtension<"image.png">;    // "png"
type Ext3 = GetExtension<"noextension">;  // never
```

#### Parse File Path
```typescript
type ParsePath<T extends string> = 
  T extends `${infer Dir}/${infer File}` 
  ? { dir: Dir; file: File }
  : { dir: ""; file: T };

type Path1 = ParsePath<"src/components/App.js">;
// { dir: "src/components"; file: "App.js" }

type Path2 = ParsePath<"README.md">;
// { dir: ""; file: "README.md" }
```

### Practical Patterns

#### 1. CSS Class Names
```typescript
type Color = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";
type ButtonClass = `btn-${Color}-${Size}`;

// Creates all combinations:
// "btn-primary-sm" | "btn-primary-md" | "btn-primary-lg" |
// "btn-secondary-sm" | "btn-secondary-md" | "btn-secondary-lg" |
// "btn-danger-sm" | "btn-danger-md" | "btn-danger-lg"
```

#### 2. Environment Variables
```typescript
type EnvVar = "API_URL" | "DB_HOST" | "CACHE_TTL";
type PublicEnv = `NEXT_PUBLIC_${EnvVar}`;

// "NEXT_PUBLIC_API_URL" | "NEXT_PUBLIC_DB_HOST" | "NEXT_PUBLIC_CACHE_TTL"
```

#### 3. API Endpoints
```typescript
type Endpoint = "users" | "posts" | "comments";
type ApiUrl = `/api/${Endpoint}`;

// "/api/users" | "/api/posts" | "/api/comments"
```

#### 4. Event Naming Convention
```typescript
type ButtonSize = "sm" | "md" | "lg";
type EventName = `button-${ButtonSize}Clicked`;

// "button-smClicked" | "button-mdClicked" | "button-lgClicked"
```

### String Parsing with Infer

#### Split Strings
```typescript
type Split<T extends string, D extends string> = 
  T extends `${infer L}${D}${infer R}` ? 
  [L, ...Split<R, D>] : 
  [T];

type Parts = Split<"a-b-c", "-">;  // ["a", "b", "c"]
```

#### Extract Protocol
```typescript
type ExtractProtocol<T extends string> = 
  T extends `${infer Protocol}://${infer Rest}` 
  ? Protocol 
  : never;

type Http = ExtractProtocol<"http://example.com">;  // "http"
type Https = ExtractProtocol<"https://example.com">; // "https"
```

### Built-in String Helpers

TypeScript provides these template literal type helpers:

```typescript
type Capitalized = Capitalize<"hello">;    // "Hello"
type Uncapitalized = Uncapitalize<"Hello">; // "hello"
type Upper = Uppercase<"hello">;            // "HELLO"
type Lower = Lowercase<"HELLO">;            // "hello"
```

### Why Template Literal Types Matter

1. **Type-safe string patterns** - Catch errors at compile time instead of runtime
2. **Generate unions automatically** - No need to manually list every combination
3. **Parse strings at compile time** - Extract information from type names
4. **IDE autocomplete support** - Shows valid completions as you type
5. **Zero runtime cost** - All template literal types are erased after compilation

### Common Use Cases

1. **Form handling** - Generate type-safe event handlers
2. **CSS-in-JS** - Type-safe class name generation
3. **API routing** - Type-safe URL construction
4. **Configuration** - Environment variable naming conventions
5. **Code generation** - Generate file names, identifiers dynamically
6. **State machines** - Event name patterns and validation

### Key Takeaways for Lecture 128

1. **Template literals at type level** - not runtime string operations
2. **Syntax**: `` `${StaticPart}-${T}` `` combines strings with type variables
3. **Work with `infer`** to parse and extract information from strings
4. **Generate unions automatically** from type combinations
5. **Built-in helpers**: `Capitalize`, `Uncapitalize`, `Uppercase`, `Lowercase`
6. **IDE autocomplete** shows valid pattern completions
7. **Error detection at compile time** for invalid string patterns
8. **Zero runtime overhead** - all erased after type checking
9. **Essential for advanced TypeScript** patterns and library design
10. **Works with conditional types** for sophisticated string manipulation

---

## Lecture 129: Introducing Conditional Types

### Overview
Conditional types are **one of TypeScript's most powerful features** - they let you create types that **choose between two types based on a condition**, similar to how ternary operators work at runtime but at the type level!

### Basic Syntax

```typescript
type SomeType<T> = T extends X ? Y : Z;
```

This reads as: "If T extends X, then Y, otherwise Z."

### Simple Example

```typescript
type Animal = "dog" | "cat" | "bird";

type IsAnimal<T> = T extends Animal ? "yes" : "no";

type Test1 = IsAnimal<string>;   // "no" (string doesn't extend Animal)
type Test2 = IsAnimal<"dog">;    // "yes" (dog extends Animal)
```

### Distributive Conditional Types

**Key property**: Conditional types ARE distributive over unions when the checked type is a type parameter.

```typescript
// This distributes over unions
type ToArray<T> = T extends any ? T[] : never;

type Result1 = ToArray<number | string>;
// (number | string)[]  → [number, string][]
// NOT number[] | string[] (distribution happens)
```

### Example: Distribution in Action

```typescript
type AnimalToys = "dog" extends string ? "ball" : "stick";  // "ball"
type MixedToys = ("dog" | 123) extends string ? "ball" : "stick";
// "ball" | "stick" (distribution: "dog"→"ball", 123→"stick")
```

### With `infer`

Conditional types combined with `infer` let you **extract types from pattern matches**:

```typescript
type GetMessageType<T> = T extends `message:${infer M}` ? M : never;

type Msg1 = GetMessageType<"message:hello">;  // "hello"
type Msg2 = GetMessageType<"message:123">;   // 123
type Msg3 = GetMessageType<"other:hello">;  // never
```

### Common Built-in Examples

These are TypeScript's built-in types that use conditional types:

```typescript
// Exclude types from a union
type MyExclude<T, U> = T extends U ? never : T;

type A = "a" | "b" | "c";
type B = "a" | "b";

type ExcludeAB = MyExclude<A, B>;  // "c"

// Extract types from union
type MyExtract<T, U> = T extends U ? T : never;

type ExtractAB = MyExtract<A, B>;  // "a" | "b"
```

### Practical Examples

#### 1. Function Return Types
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type GetUser = () => { name: string; age: number };
type User = ReturnType<GetUser>;  // { name: string; age: number }
```

#### 2. Instance Type from Constructor
```typescript
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : never;

class Person {
  name: string = "John";
}

type PersonInstance = InstanceType<typeof Person>;  // Person
```

#### 3. Array/Tuple Elements
```typescript
type ElementType<T> = T extends (infer E)[] ? E : never;

type NumArray = ElementType<number[]>;      // number
type StrTuple = ElementType<[string, number]>; // string | number
```

#### 4. Async vs Sync Detection
```typescript
type AsyncOrSync<T> = T extends (...args: any[]) => infer R 
  ? R extends Promise<any> ? "async" : "sync" 
  : "not a function";

type Test1 = AsyncOrSync<() => string>;            // "sync"
type Test2 = AsyncOrSync<() => Promise<string>>; // "async"
type Test3 = AsyncOrSync<string>;                  // "not a function"
```

### Non-Distributive Conditional Types

Use a wrapper type to prevent distribution:

```typescript
type Dist<T> = T extends X ? Y : Z;         // Distributive
type NonDist<T> = [T] extends [X] ? Y : Z;  // Not distributive

// Example:
type DistResult = ("a" | "b") extends string ? number : boolean;
// number | boolean (both "a" and "b" extend string)

type NonDistResult = ["a" | "b"] extends [string] ? number : boolean;
// boolean (the tuple "a" | "b" doesn't extend [string])
```

### Why Conditional Types Matter

1. **Type-level decision making** - Choose types based on patterns
2. **Type inference** - Extract information from complex types
3. **Build utility types** - Foundation for TypeScript's built-in utilities
4. **Library design** - Create flexible, type-safe APIs
5. **Zero runtime cost** - All resolved at compile time
6. **Reusability** - Works with generics and mapped types

### Key Takeaways for Lecture 129

1. **Syntax**: `T extends X ? Y : Z` - if T extends X, return Y, else Z
2. **Distributive over unions** - conditional applies to each union member
3. **Works with `infer`** to extract types from patterns
4. **Built-in examples**: `Exclude`, `Extract`, `ReturnType`, `InstanceType`
5. **Practical uses**: return types, instance types, element extraction
6. **Non-distributive version** - wrap in tuple to prevent distribution
7. **Foundation for advanced types** - essential for utility types
8. **Zero runtime cost** - all resolved at compile time
