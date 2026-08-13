# Section 9: Classes & Generics Demo Project - Linked List

## Course Structure

- **111.** Module Introduction
- **111.** What Is A Linked List?
- **112.** Creating List & Node Classes
- **113.** Making the Class Generic
- **114.** Adding an "add" Method
- **115.** Adding Items More Efficiently
- **116.** Accessing the Data & Compiling + Running the Code
- **117.** Finishing the Linked List

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