# Section 11: ECMAScript Decorators

## Course Structure

- **133.** Module Introduction
- **134.** Module Introduction ✅
- **134.** What Are Decorators? And ECMAScript Decorators vs Experimental Decorators ✅
- **135.** Exploring Different Types of Decorators ✅
- **136.** Building a First Decorator ✅
- **137.** Building a Class Decorator That Edits a Class ✅
- **138.** Understanding Decorator Code Execution Order ✅
- **139.** Creating a Method Decorator ✅
- **140.** Using Decorators To Solve A Common Problem ✅
- **141.** Implementing A Decorator-based Solution: autobind ✅
- **142.** Replacing Methods with Decorators ✅
- **143.** Introducing the Field Decorator ✅
- **144.** Building Configurable Decorators with Factories ✅
- **145.** Onwards to Experimental Decorators ✅

---

## Lecture 133: Module Introduction

### Overview
Section 11 focuses on **ECMAScript Decorators** - one of the most exciting and powerful features in modern TypeScript and JavaScript. This section explores how decorators provide a way to add metadata and modify the behavior of classes, methods, properties, and parameters at design time.

### What You'll Learn

1. **Decorator fundamentals** - What decorators are and their syntax
2. **Different decorator types** - Class, method, property, parameter, and accessor decorators
3. **Execution order** - How multiple decorators stack and execute
4. **Practical implementations** - Building real-world decorators from scratch
5. **Common problems solved** - Logging, autobinding, validation, and more
6. **Factory patterns** - Creating configurable decorators with options
7. **Experimental vs standardized** - Understanding the decorator landscape

### Why Decorators Matter

- **Cleaner code** - Avoid repetitive patterns with declarative `@` syntax
- **Reusability** - Apply the same logic across multiple code areas
- **Readability** - Declarative syntax is easier to understand
- **Industry adoption** - Used in Angular, NestJS, and many libraries

### Prerequisites

- TypeScript knowledge (intermediate level)
- Understanding of classes and objects
- Familiarity with function types

### Section Goals

By the end of this section, you'll be able to:
- Create your own decorators from scratch
- Understand decorator execution order and best practices
- Solve common problems with decorator-based solutions
- Build configurable decorators with factories
- Understand the current state of decorators in the JavaScript ecosystem

### Lecture Overview

| Lecture | Topic | Focus |
|---------|-------|-------|
| **133** | Module Introduction | Section overview and goals |
| **134** | What Are Decorators? | ECMAScript vs TypeScript decorators |
| **135** | Different Types of Decorators | Class, method, property types |
| **136** | Building a First Decorator | Creating your first decorator |
| **137** | Class Decorator That Edits a Class | Modifying class behavior |
| **138** | Decorator Execution Order | Understanding order effects |
| **139** | Creating a Method Decorator | Method-specific decorators |
| **140** | Using Decorators To Solve A Common Problem | Real-world applications |
| **141** | Implementing A Decorator-based Solution: autobind | The autobind pattern |
| **142** | Replacing Methods with Decorators | Method replacement technique |
| **143** | Introducing the Field Decorator | Property/field decorators |
| **144** | Building Configurable Decorators with Factories | Factory pattern for decorators |
| **145** | Onwards to Experimental Decorators | Future of decorators |

---

## Lecture 134: What Are Decorators? And ECMAScript Decorators vs Experimental Decorators

### Overview
This lecture introduces decorators and explains the distinction between the **standardized (ECMAScript) proposal** and the **TypeScript experimental implementation**.

### What Are Decorators?

```typescript
// Simple class decorator
function Logger() {
  return function(target: Function) {
    console.log('Logging class...');
  };
}

@Logger()
class MyClass {
  // ...
}
```

### ECMAScript Decorators vs TypeScript Experimental Decorators

| Aspect | ECMAScript (Standard) | TypeScript Experimental |
|--------|----------------------|------------------------|
| **Status** | Stage 3 proposal | Fully implemented |
| **Syntax** | Same `@` syntax | Same `@` syntax |
| **Availability** | Not in JavaScript yet | Available now in TS |
| **Features** | Limited initially | More features & options |
| **Example** | Future JS standard | Used in Angular, NestJS |

### Key Differences

1. **Standardization progress** - ECMAScript is still being finalized
2. **TypeScript ahead** - TS implements decorators before the standard
3. **Options & configurability** - TS provides more options
4. **Runtime vs compile-time** - Both run at design time

### Why This Matters

- **Learn the concepts** that apply to both
- **TypeScript decorators** are production-ready now
- **Future-proof** - Understanding standards helps
- **Library compatibility** - Know how code works under the hood

### Quick Example

```typescript
// TypeScript decorator (works now)
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
---

## Lecture 135: Exploring Different Types of Decorators

### Overview
This lecture explores the **five main types of decorators** available in TypeScript, each targeting different parts of your code.

### The Five Decorator Types

| Type | Target | Example |
|------|--------|---------|
| **Class Decorator** | Class constructor | `@sealed class Foo {}` |
| **Object Method Decorator** | Method prototype | `@logged method() {}` |
| **Property Decorator** | Property descriptor | `@readonly prop` |
| **Parameter Decorator** | Parameter index | `@param decorator` |
| **Accessor Decorator** | Getter/setter | `@loggedGetter` |

### Decorator Execution Order

When multiple decorators are applied, they execute **bottom-up** (from last to first):

```typescript
function d1(target: any) { console.log('d1'); }
function d2(target: any) { console.log('d2'); }
function d3(target: any) { console.log('d3'); }

@d1
@d2
@d3
class MyClass {
// Execution order: d3 → d2 → d1
}
```

---

## Lecture 136: Building a First Decorator

### Overview
Learn how to create your **first decorator from scratch** - the foundation for all other decorator types.

### Creating a Simple Decorator

```typescript
// A simple class decorator
function printClassName(target: Function) {
  console.log('Class name: ' + target.name);
}

// Usage
@printClassName
class MyClass {
  // ...
}

// Output: "Class name: MyClass"
```

### How Decorators Work

1. **Decorator function** receives the **target** as a parameter
2. **Returns** a modified version or the original
3. **Applied at design time** before instantiation
4. **Can modify** the target or add new properties

### Key Rules

1. **Class decorator** receives the constructor function
2. **Must return** the constructor (or a replacement)
3. **Other types** receive different parameters based on their target
4. **All decorators** are functions that take specific arguments

### Practical Example: Simple Logger

```typescript
function Logger(target: Function) {
  console.log(`Creating class: ${target.name}`);
}

@Logger
class User {
  constructor() {
    console.log('User created');
  }
}

// Console output:
// Creating class: User
// User created (when instantiated)
```

### Why Start Simple

- Understand the **basic mechanism**
- Learn **parameter types** for each decorator
- Build foundation for **complex decorators**
- Debugging is easier with simple examples
```