# Section 9: Classes & Generics Demo Project - Linked List

## Course Structure

- **111.** Module Introduction ✅
- **112.** What Is A Linked List? ✅
- **113.** Creating List & Node Classes ✅
- **114.** Making the Class Generic ✅
- **115.** Adding an "add" Method ✅
- **116.** Adding Items More Efficiently ✅
- **117.** Accessing the Data & Compiling + Running the Code
- **118.** Finishing the Linked List

---

## Lecture 111: Module Introduction

### Overview
This section is a hands-on demo project where we implement a **Linked List** data structure from scratch using TypeScript classes and generics.

### What is a Linked List?

A **Linked List** is a linear data structure where elements are stored in **non-contiguous memory locations**. Instead of being stored sequentially like an array, each element (called a **node**) contains:

1. **Data** - the actual value (number, string, object, etc.)
2. **Next pointer** - reference to the next node in the sequence

```
Head → [ 5 | • ] → [ 10 | • ] → [ 15 | null ] → null
```

### Key Components

- **Node**: Contains data and a reference to the next node
- **Head**: Reference to the first node in the list
- **Tail**: Reference to the last node (points to null)
- **Next pointer**: Links each node to the next one

### Why Use a Linked List?

| Feature | Array | Linked List |
|---------|-------|-------------|
| Memory | Contiguous | Scattered |
| Access | O(1) | O(n) |
| Insert/Delete | O(n) | O(1) at beginning |

### What We'll Build

We'll create a type-safe, generic linked list implementation with:
- `Node<T>` class for individual nodes
- `LinkedList<T>` class with methods like `add()`, `print()`
- Type safety through generics: `LinkedList<number>`, `LinkedList<string>`

### Why This Matters for TypeScript

This project helps us practice:
- **TypeScript classes** - structuring data with proper encapsulation
- **Generics** - making our list flexible and type-safe
- **Null handling** - working with `strict` mode and `noUncheckedIndexedAccess`
- **Object references** - understanding how nodes link together

### Key Takeaways

- Linked lists store data in nodes connected by pointers
- Each node has data + reference to next node
- Head and tail track the boundaries of the list
- Great for practicing TypeScript classes and generics
- Dynamic size - grows/shrinks as needed

---

## Lecture 112: Creating List & Node Classes

### Overview
We create the foundational classes for our linked list: `ListNode` and `LinkedList`. We also learn about **encapsulation** using `private` access modifiers and why we use **classes as types** instead of interfaces or type aliases.

### Implementation

```typescript
class ListNode {
  data: any;
  next: ListNode | null;
}

class LinkedList {
  private root?: ListNode;
  private length = 0;
}
```

---

### Why Properties Are `private`

**Encapsulation** means hiding internal implementation details and only exposing a safe public API.

```typescript
class LinkedList {
  private root?: ListNode;   // Only accessible INSIDE this class
  private length = 0;        // Only accessible INSIDE this class
  
  // Public methods are the ONLY way to interact
  add(data: any): void { }
  print(): void { }
  getLength(): number { return this.length; }
}
```

#### Benefits of `private`:

1. **Prevent Invalid States**
   ```typescript
   const list = new LinkedList();
   // list.root = null;        // ❌ TypeScript error: Property 'root' is private
   // list.length = -5;        // ❌ TypeScript error: Property 'length' is private
   ```

2. **Control How Data Changes**
   - All modifications go through controlled methods
   - The class can validate data before changing state

3. **Flexibility to Change Implementation**
   - You can rename `root` to `head` internally without breaking external code
   - Users only depend on the public API

4. **Clear API Design**
   - Users know exactly what they can use
   - Internal complexity is hidden

---

### Why Use a `class` as a Type (Instead of Interface/Type Alias)

TypeScript classes serve **dual purpose**: they create both a **runtime value** AND a **compile-time type**.

#### Comparison of Three Approaches:

**Option 1: Class (Recommended for our case) ✅**
```typescript
class ListNode {
  data: any;
  next: ListNode | null;
}

const node = new ListNode(5);  // Creates actual object
console.log(node instanceof ListNode);  // true
```

**Option 2: Interface**
```typescript
interface ListNode {
  data: any;
  next: ListNode | null;
}

const node = { data: 5, next: null };  // Just a plain object
// console.log(node instanceof ListNode);  // ❌ Error
```

**Option 3: Type Alias**
```typescript
type ListNode = {
  data: any;
  next: ListNode | null;
};

const node = { data: 5, next: null };  // Just a plain object
// console.log(node instanceof ListNode);  // ❌ Error
```

---

### Advantages of Using `class`:

#### 1. **Creates Runtime Value**
```typescript
class ListNode {
  data: any;
  next: ListNode | null;
}

const node = new ListNode(42);  // ✅ Actual object created at runtime
console.log(node.data);  // 42
```

#### 2. **Can Add Methods**
```typescript
class ListNode {
  data: any;
  next: ListNode | null;
  
  print(): void {
    console.log(this.data);
  }
  
  hasNext(): boolean {
    return this.next !== null;
  }
}

node.print();  // 42
```

#### 3. **Constructor for Initialization**
```typescript
class ListNode {
  data: any;
  next: ListNode | null;
  
  constructor(data: any) {
    this.data = data;
    this.next = null;  // Guaranteed initialization
  }
}

const node = new ListNode(5);  // Guaranteed to have data and next set
```

#### 4. **Supports Private/Protected Members**
```typescript
class ListNode {
  data: any;
  next: ListNode | null;
  private id: number = Date.now();  // Internal state
  
  getInternalId(): number {
    return this.id;  // ✅ Can access private member
  }
}
```

#### 5. **Can Use `instanceof` for Type Guards**
```typescript
if (node instanceof ListNode) {
  console.log('This is definitely a ListNode');
}
```

---

### When to Use Interface or Type Alias Instead

**Use `interface` or `type` when:**
- You only need compile-time type checking
- You don't need to instantiate with `new`
- You're describing external data structures (e.g., API responses)
- You want structural typing (duck typing)

```typescript
// Good use case for interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Describing external data
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

---

### Why Class is Best for ListNode

In our linked list implementation:

1. **We will instantiate it**: `new ListNode(data)`
2. **It represents a real runtime entity**: a node in memory
3. **We might add methods later**: `printNode()`, `hasNext()`
4. **Self-reference is natural**: `next: ListNode | null`
5. **Consistency**: `LinkedList` is already a class

---

### Code Example: Using the Classes

```typescript
class ListNode {
  data: any;
  next: ListNode | null;
}

class LinkedList {
  private root?: ListNode;
  private length = 0;
  
  // Public methods will be added next
  getLength(): number {
    return this.length;
  }
}

const list = new LinkedList();
console.log(list.getLength());  // 0

// list.root = new ListNode(5);  // ❌ Error: Property 'root' is private
```

---

### Key Takeaways

- **`private`** enforces encapsulation - only the class itself can access these properties
- **Classes** create both runtime values and compile-time types
- **Interfaces/type aliases** only exist at compile time
- Use **class** when you need instantiation, methods, or runtime behavior
- Use **interface/type** for describing data shapes
- Encapsulation protects the integrity of the data structure
- Private properties with public methods = clean, maintainable API

---

## Lecture 113: Making the Class Generic

### Overview
We introduce **generics** to our linked list to achieve **type safety**. Instead of using `any`, we use a type parameter `<T>` so the compiler knows what type of data our linked list holds.

### What is a Generic Type Parameter?

**`<T>`** is a **type parameter** - a placeholder for any type. It acts like a variable, but for types instead of values.

```typescript
class LinkedList<T> {
  // T can be number, string, User, etc.
  add(value: T) { }
}
```

### Why Use Generics?

#### Without Generics (type: `any`)
```typescript
class LinkedList {
  add(data: any) { }  // ❌ Loses type safety
}

const list = new LinkedList();
list.add(5);         // OK
list.add("hello");   // OK - but we might not want strings!
list.add({});        // OK - anything goes
```

#### With Generics (type: `T`)
```typescript
class LinkedList<T> {
  add(value: T) { }
}

const numbers = new LinkedList<number>();
numbers.add(5);       // ✅ OK
// numbers.add("hello");  // ❌ Error: Type 'string' is not assignable to type 'number'

const strings = new LinkedList<string>();
strings.add("hello"); // ✅ OK
// strings.add(5);       // ❌ Error: Type 'number' is not assignable to type 'string'
```

### Implementation

```typescript
class ListNode<T> {
  next?: ListNode<T>;
  constructor(public value: T) {}
}

class LinkedList<T> {
  private root?: ListNode<T>;  // ✅ Generic ListNode
  private length = 0;

  add(value: T) {
    // T flows through the entire class
    const node = new ListNode<T>(value);
    // ... logic to add node
  }
}
```

### Why Both Classes Must Be Generic

The type parameter `<T>` must flow through the entire structure:

```
LinkedList<T>  → manages →  ListNode<T>  → stores →  T (data)
```

**Example with `number`:**
```typescript
const list = new LinkedList<number>();
// T = number
// root?: ListNode<number>
// ListNode.data: number
```

**Example with `string`:**
```typescript
const list = new LinkedList<string>();
// T = string
// root?: ListNode<string>
// ListNode.data: string
```

### Creating Generic Instances

```typescript
// Specify the type explicitly
const numbers = new LinkedList<number>();
numbers.add(1);
numbers.add(2);

const names = new LinkedList<string>();
names.add("Alice");
names.add("Bob");

// Type inference (less explicit)
const list = new LinkedList(5);  // T inferred as number
```

### Benefits of Generics

1. **Type Safety**: Errors caught at compile time
2. **Reusability**: One class works for all types
3. **Better IDE Support**: Autocomplete and type hints work correctly
4. **No `any`**: We maintain full type information
5. **Self-documenting**: The type parameter makes code clearer

---

### Key Takeaways

- **`<T>` makes a class generic** - it accepts any type as a parameter
- **Type safety** - errors caught at compile time, not runtime
- **Reusability** - one class works for all types
- **Both classes need generics** - `ListNode<T>` and `LinkedList<T>`
- **`T` flows through** - `LinkedList<T>` → `ListNode<T>` → `data: T`
- **No more `any`** - we use `T` instead of losing type information

---

## Lecture 114: Adding an "add" Method

### Overview
We implement the `add()` method to append new nodes to the end of the linked list. This is our first public method and demonstrates how to work with private properties safely.

### Implementation

```typescript
add(value: T) {
  const node = new ListNode(value);
  
  if (!this.root) {
    // Case 1: Empty list
    this.root = node;
  } else {
    // Case 2: Non-empty list - traverse to end
    let current = this.root;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
  
  this.length++;
}
```

### How `add()` Works

#### Step-by-Step Execution:

```typescript
const list = new LinkedList<number>();

// Step 1: Add first element
list.add(5);
// - Creates: ListNode<number> { value: 5, next: undefined }
// - List is empty (!this.root), so this.root = node
// - List: [5]
// - length = 1

// Step 2: Add second element
list.add(10);
// - Creates: ListNode<number> { value: 10, next: undefined }
// - List is not empty, so traverse:
//   - current = this.root (node with value 5)
//   - current.next is undefined, so exit loop
//   - current.next = node (new node with value 10)
// - List: [5] → [10]
// - length = 2

// Step 3: Add third element
list.add(15);
// - Creates: ListNode<number> { value: 15, next: undefined }
// - Traverse: 5 → 10 (both have next defined, except 10)
//   - current = 10 (next is undefined)
//   - Exit loop
// - current.next = node (new node with value 15)
// - List: [5] → [10] → [15]
// - length = 3
```

### The Two Cases

#### Case 1: Empty List (`!this.root`)
```typescript
if (!this.root) {
  this.root = node;
}
```
- The list has no nodes
- The new node becomes the `root` (first node)
- Simple assignment

#### Case 2: Non-Empty List (else block)
```typescript
let current = this.root;
while (current.next) {
  current = current.next;
}
current.next = node;
```
- Start at `root`
- Follow `next` pointers until we reach the last node
- The last node has `next = undefined`
- Set that node's `next` to our new node

### Visual Example

```
Before: [5] → [10] → null
                    ↑ current (while loop ends here)

After:  [5] → [10] → [15] → null
                      ↑ new node added
```

### Why the While Loop Works

```typescript
while (current.next) {
  current = current.next;
}
```

- `current.next` is `undefined` for the last node
- The loop continues while `next` EXISTS
- When `next` is `undefined`, the loop stops
- `current` now points to the last node

### Time Complexity

**Current implementation: O(n)**

- To add one element, we traverse n-1 existing elements
- For list with 1000 elements, adding element 1001 requires 1000 iterations
- Not optimal for large lists (we'll fix this in lecture 115)

### Accessing Private Properties

Notice how `add()` can access `private` properties:

```typescript
add(value: T) {
  this.root = node;      // ✅ Inside class - can access private
  this.length++;         // ✅ Inside class - can access private
}

// Outside the class:
// list.root = node;     // ❌ Error: Property 'root' is private
// list.length = 5;      // ❌ Error: Property 'length' is private
```

This is **encapsulation** - the class controls how data is modified.

### Type Safety in Action

```typescript
const list = new LinkedList<number>();

list.add(5);        // ✅ T = number, value = 5
list.add(10);       // ✅ OK
// list.add("text"); // ❌ Compile-time error!

// The compiler prevents type errors before runtime
```

### Key Takeaways

- **Generics** (`<T>`) make the class type-safe and reusable
- **Both classes must be generic** for type information to flow correctly
- **`add()` method** appends nodes to the end of the list
- **Two cases**: empty list (set root) and non-empty list (traverse + append)
- **Time complexity is O(n)** - traverses entire list to find end
- **Encapsulation** ensures only the class can modify `root` and `length`
- **Type safety** catches errors at compile time, not runtime

---

## Lecture 115: Adding Items More Efficiently

### Overview
We optimize the `add()` method by introducing a `tail` pointer. This reduces the time complexity from **O(n)** to **O(1)** by eliminating the need to traverse the entire list when adding a new element.

### The Problem with Lecture 114

```typescript
add(value: T) {
  const node = new ListNode(value);
  
  if (!this.root) {
    this.root = node;
  } else {
    let current = this.root;
    while (current.next) {      // ❌ O(n) - must traverse entire list
      current = current.next;
    }
    current.next = node;
  }
  
  this.length++;
}
```

**Time Complexity: O(n)**
- To add one element, we visit every existing element
- For list with 1000 elements, adding element 1001 requires 1000 iterations
- Not scalable for large lists!

### The Solution: Add a `tail` Pointer

**Concept:** Store a direct reference to the **last node** in the list.

```typescript
class LinkedList<T> {
  private root?: ListNode<T>;
  private tail?: ListNode<T>;  // ✅ NEW: Direct reference to last node
  private length = 0;
}
```

### Optimized Implementation

```typescript
add(value: T) {
  const node = new ListNode(value);
  
  if (!this.root || !this.tail) {
    // Empty list: both root and tail point to the new node
    this.root = node;
    this.tail = node;
  } else {
    // Non-empty list: O(1) direct access via tail
    this.tail.next = node;  // Link current tail to new node
    this.tail = node;       // Update tail to point to new node
  }
  
  this.length++;
}
```

**Time Complexity: O(1)**
- Access tail directly (no traversal)
- Update tail in constant time
- Same performance whether list has 10 or 1,000,000 elements!

---

### Performance Comparison

| Operation | Lecture 114 (no tail) | Lecture 115 (with tail) |
|-----------|----------------------|------------------------|
| add() to empty list | O(1) | O(1) |
| add() to 10 elements | O(10) | O(1) |
| add() to 1000 elements | O(1000) | O(1) |
| add() to 1,000,000 elements | O(1,000,000) | O(1) |

---

### Key Takeaways

1. **Tail pointer enables O(1) `add()`** - No more traversal needed
2. **Trade memory for speed** - One extra pointer vs. O(n) traversal
3. **Always update both `root` and `tail`** when list is empty
4. **Always update `tail`** after adding to non-empty list
5. **This is a standard optimization** in linked list implementations
6. **Dramatic performance improvement** for large lists (1,000,000+ elements)
7. **O(1) is constant time** - same speed regardless of list size