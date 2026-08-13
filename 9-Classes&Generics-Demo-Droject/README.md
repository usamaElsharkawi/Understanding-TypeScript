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