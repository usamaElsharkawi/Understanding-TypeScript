# Section 11: ECMAScript Decorators

## Course Structure

- **133.** Module Introduction
- **134.** What Are Decorators? And ECMAScript Decorators vs Experimental Decorators
- **135.** Exploring Different Types of Decorators
- **136.** Building a First Decorator
- **137.** Building a Class Decorator That Edits a Class ✅
- **138.** Understanding Decorator Code Execution Order ✅
- **139.** Creating a Method Decorator ✅
- **140.** Using Decorators To Solve A Common Problem ✅
- **141.** Implementing A Decorator-based Solution: autobind ✅
- **142.** Replacing Methods with Decorators ✅
- **143.** Introducing the Field Decorator ✅
- **144.** Building Configurable Decorators with Factories
- **145.** Onwards to Experimental Decorators

---

## Lecture 133: Module Introduction

### Overview
Section 11 focuses on **ECMAScript Decorators** - one of the most exciting and powerful features in modern TypeScript and JavaScript. This section explores how decorators provide a way to add metadata and modify the behavior of classes, methods, properties, and parameters at design time.

### What You'll Learn

1. **Decorator fundamentals** - What decorators are and their syntax
2. **Different decorator types** - Class, method, property, parameter, and accessor decorators
3. **Execution order** - How multiple decorators stack and execute
3. **Practical implementations** - Building real-world decorators from scratch
4. **Common problems solved** - Logging, autobinding, validation, and more
5. **Factory patterns** - Creating configurable decorators with options
6. **Experimental vs standardized** - Understanding the decorator landscape

### Why Decorators Matter

- **Cleaner code** - Avoid repetitive patterns with declarative `@` syntax
- **Reusability** - Apply the same logic across multiple code areas
- **Readability** - Declarative syntax is easier to understand
- **Industry adoption** - Used in Angular, NestJS, and many libraries

### Decorators vs the Decorator Design Pattern

**Great question!** This is something that confuses lots of people, so let's break it down clearly.

#### The Short Answer:

> **Same goal, different tools.**

The Decorator Design Pattern (from the 1990s) and TypeScript Decorators (language feature) solve the same problem: "How do I add behavior to objects without modifying their code?" But they go about it differently.

#### The Detailed Comparison:

| Aspect | Decorator Design Pattern | TypeScript Decorators |
|--------|-------------------------|----------------------|
| **When** | Runtime (program runs) | Compile-time (tsc runs) |
| **Syntax** | `new MilkDecorator(coffee)` | `@MilkDecorator` above class |
| **Who writes the wrapper** | You write the wrapping code | TypeScript generates it |
| **Flexibility** | Very flexible, runtime | Less flexible, compile-time |
| **When it was invented** | 1994 (Gang of Four) | 2015+ (TC39/TypeScript) |
| **Language support** | Any OOP language (Java, C#, Python, etc.) | TypeScript/JavaScript only |
| **Runtime overhead** | Yes, happens every time | No, erased after compilation |

#### The History (Why They Share a Name):

1. **1994** - Gang of Four publishes "Design Patterns" book, introducing the Decorator Pattern
2. **2015-2017** - JavaScript community asks: "Wouldn't it be great if JS had this pattern built-in?"
3. **Result** - They created **Decorators** as a language feature, borrowing the name because it solves the same problem

#### Human Analogy:

| Decorator Design Pattern | TypeScript Decorator |
|-------------------------|---------------------|
| Building a house where you can add rooms later | Stamping labels on products before they're made |
| You manually add each room | The stamp is applied automatically |
| You can add/remove rooms anytime | The label is fixed when stamped |
| Works in any house (language) | Only works in TypeScript |

#### Code Comparison:

**Design Pattern approach:**
```typescript
// You write this manually
class Coffee { /* ... */ }
class MilkDecorator extends Coffee {
  constructor(private coffee: Coffee) {
    super();
  }
  cost() { return this.coffee.cost() + 2; }
}

// Usage
const myCoffee = new MilkDecorator(new Coffee());
```

**TypeScript Decorator approach:**
```typescript
// You just add @ syntax
function MilkDecorator(target: any) {
  // TypeScript generates the wrapper automatically
  target.cost = function() { return 7; }; // 5 base + 2 milk
}
return target;
}

// Usage
@MilkDecorator
class Coffee { /* ... */ }
```

#### When to Use Which?

| Situation | Use Design Pattern | Use TS Decorator |
|-----------|-------------------|------------------|
| Need runtime flexibility | ✅ | ❌ |
| Want concise, clean code | ❌ | ✅ |
| Building a framework/library | ✅ | ✅ (but pattern is more flexible) |
| Adding features to your app | ❌ | ✅ |
| Need to support multiple languages | ✅ | ❌ |

#### Key Takeaways:

1. **They're cousins, not twins** - Same problem, different solutions
2. **TS decorators are easier** - Less code, but less flexible
3. **Understanding the pattern helps** - You'll use decorators better
4. **Knowing the limitations** - TS decorators can't do everything the pattern can
5. **You'll likely use TS decorators 90% of the time** - They're just more convenient

#### Why This Matters for You:

- **Understanding the pattern** helps you know what decorators are capable of
- **Knowing the limitations** - TS decorators can't do everything the pattern can
- **Better troubleshooting** - When a decorator doesn't work as expected, you'll know why
- **Future-proofing** - If you switch languages, you'll understand the equivalent concept

#### Bottom Line:

> **The Design Pattern is the "idea". The TS Decorator is the "implementation".**

You need the idea to use the implementation effectively. That's why we're covering both!

---

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
## Lecture 135: Types of Decorators

## Lecture 135: Types of Decorators
**Instructor's note:** Decorators are an Object-Oriented Programming feature that lets you modify classes, methods, properties, and getters/setters.
1. **Class Decorators** - Modify the entire class constructor
2. **Method Decorators** - Modify individual methods
3. **Field Decorators** - Modify class properties
4. **Getter Decorators** - Intercept property reads
5. **Setter Decorators** - Intercept property writes
Each type targets a different granularity level of your objects, from the whole class down to individual property accesses.
---
## Lecture 136: Building a First Decorator

### Overview
Learn how to create your first decorator from scratch - the foundation for all other decorator types.

### Creating a Simple Decorator

```typescript
// A simple class decorator
function printClassName(target: Function) {
  console.log("Class name: " + target.name);
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
    console.log("User created");
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

---

## Lecture 137: Building a Class Decorator That Edits a Class

### Lecture 136 vs 137: Moving from Observer to Operator

| Aspect | Lecture 136 | Lecture 137 |
|--------|-------------|-------------|
| **Purpose** | Just log information | Actually modify/change class |
| **Return Value** | Not critical (just logging) | **Critical - must return constructor** |
| **Modification** | None (read-only) | Can add/remove/seal properties |
| **Complexity** | Simple logging | Practical class modification |
| **Real-world use** | Debugging/tracing | Production-ready enhancements |

### Key Concept: Class Decorators That Modify

A class decorator can modify the class constructor in three ways:

1. **Add new properties/methods** to the constructor or prototype
2. **Seal/freeze** the class (prevent extensions)
3. **Replace** the constructor entirely

### The Pattern:

```typescript
function decoratorName(target: Function) {
  // 1. Modify the target
  target.newProperty = 'added';
  
  // 2. Add a static method
  target.staticMethod = function() { /* ... */ };
  
  // 3. CRITICAL: Return the (possibly modified) constructor
  return target;
}
```

### Example 1: Class Sealer

```typescript
function sealed(target: Function) {
  Object.seal(target);
  Object.seal(target.prototype);
  
  return target;
}

@sealed
class User {
  constructor(public name: string) {}
  
  getName() {
    return this.name;
  }
}

// Usage:
const user = new User('Alice');

// ✅ Works normally
console.log(user.getName()); // 'Alice'

// ❌ Can't add new properties to instance
user.email = 'alice@example'; // ❌ Error: Cannot add property email

// ❌ Can't extend the class
class AdminUser extends User {} // ❌ Error: Class extends not allowed
```

### Example 2: Adding a Utility Method

```typescript
function WithUtils(target: Function) {
  // Add a method to the prototype
  target.prototype.calculate = function(x: number, y: number) {
    return x + y;
  };
  
  // Add a static method
  target.getUtils = function() {
    return 'utils';
  };
  
  return target;
}

@WithUtils
class MathClass {
  // No need to define calculate - it's added by the decorator!
}

// Usage:
const utils = MathClass.getUtils(); // 'utils'
const result = new MathClass().calculate(2, 3); // 5
```

### Why This Lecture is Important

Moving from "Observer" to "Operator":

- **Lecture 136:** You're **observing** what happens (logging)
- **Lecture 137:** You're **operating** on the code (modifying)

This is the difference between:
- ✅ "I want to know when this method is called" (Lecture 136)
- ✅ "I want to add logging to every method automatically" (Lecture 137)

### Real-World Use Cases

1. **Angular's `@Component` and `@NgModule`** - Modify how Angular processes classes
2. **NestJS Guards, Pipes, Interceptors** - All use class decorators to modify behavior
3. **Enforcing Patterns** - Ensure classes follow certain rules (sealed, have methods)
4. **Adding Cross-Cutting Concerns** - Logging, timing, validation applied to entire classes
5. **Library Development** - Modify user classes in reusable libraries

### Rules to Remember

**Must Do:**
1. **Return the constructor** from class decorators
2. **Use proper signature** `(target: Function) => Function`
3. **Modify prototype or add static methods**
4. **Keep modifications focused and documented**

**Common Mistakes:**
1. **Forgetting to return** - decorator does nothing
2. **Modifying wrong object** - target vs prototype vs instance
3. **Sealing after returning** - too late!
4. **Not considering edge cases** - what if class has existing properties?

### Code Review: Your Implementation

Your current decorator:

```typescript
function logger<T extends new (...args: any[]) => any>(
  target: T,
  ctx: ClassDecoratorContext,
) {
  console.log("logger decorator");
  console.log(target);
  console.log(ctx);
  return class extends target {
    age = 44;
  };
}

@logger
class Person {
  name = "usama";
  great() {
    console.log("Hi,I am" + this.name);
  }
}

const person1 = new Person()
console.log(person1)
```

**Instructor's typical simpler approach:**

```typescript
function logger(target: Function, ctx: ClassDecoratorContext) {
  console.log("logger decorator");
  console.log(target);
  console.log(ctx);
  return class extends (target as any) {
    age = 44;
  };
}
```

| Aspect | Your Code | Instructor Typical |
|--------|-----------|-------------------|
| **Generics** | Uses `<T extends new (...args: any[]) => any>` | Most don't use generics initially |
| **Type safety** | Highly type-safe (no `as any`) | Often uses `any` for simplicity |
| **Decorator API** | Uses `ClassDecoratorContext` | ✅ Same approach |
| **Class modification** | Returns `class extends target` | ✅ Same pattern |
| **Simplicity** | Some complexity from generics | Simpler, more verbose steps |

**Your implementation is actually MORE advanced** - it uses proper TypeScript generics for full type safety, avoiding the need for `as any` casts!

### Key Takeaways for Lecture 137

1. **Decorators can modify classes**, not just log about them
2. **Must return the constructor** (or modified version)
3. **Can seal classes** to prevent unwanted extensions
4. **Can add methods** via prototype or static methods
5. **Return `class extends target`** to add instance properties cleanly
6. **TypeScript generics** (`T extends new (...)`) provide type safety
7. **Real-world frameworks** (Angular, NestJS) use this exact pattern
8. **Moving from observer to operator** is a crucial step


---

## Lecture 138: Understanding Decorator Code Execution Order

### The Instructor's Point: Order Matters!

Ever wonder what happens when you stack multiple decorators? Which runs first? This is crucial!

### The Golden Rule: Bottom-Up Execution

> **Decorators execute from bottom to top (last to first)**

Think of it like onion layers:

```
🧅 d1 (outer - runs LAST)
  🧅 d2 (middle)
    🧅 d3 (inner - runs FIRST!)
      MyClass
```

### Simple Example

```typescript
@d1
@d2
@d3
class MyClass {}

// Execution: d3 → d2 → d1 (bottom to top)
```

### Why Order Matters

When you stack decorators, each one wraps the result of the previous:

```typescript
@logging       // Logs entry/exit
@timing        // Measures execution time
@errorHandler  // Catches errors
expensiveOperation() { /* ... */ }
```

This ensures:
1. Errors are caught (innermost)
2. Timing includes everything
3. Logging wraps everything

### Code Example

```typescript
function d1(target: any) { console.log('d1'); return target; }
function d2(target: any) { console.log('d2'); return target; }
function d3(target: any) { console.log('d3'); return target; }

@d1
@d2
@d3
class MyClass {}

// Console output:
// d3  ← runs first (bottom)
// d2  ← runs second
// d1  ← runs last (top)
```

### Real-World Layering

The most common pattern for layered decorators:

```typescript
@logging       // Logs entry/exit
@timing        // Measures execution time
@errorHandler  // Catches errors
expensiveOperation() { /* ... */ }
```

### Key Takeaways for Lecture 138

1. **Decorators execute bottom-up** - bottom decorator runs first
2. **Visual vs execution order** - they are reversed!
3. **Onion model** - innermost runs closest to code
4. **Chaining effects** - each wraps the result of the previous
5. **Order affects behavior** - layer order determines functionality
6. **Debug with logs** - add console.log inside each decorator
7. **Real apps stack decorators** - security, logging, timing, etc.
8. **Essential for correct decorators** - order determines correctness

## Lecture 139-142: Method Decorators - Solving the `this` Problem

### Overview
These four lectures form a cohesive unit focused on solving a **fundamental JavaScript problem**: losing `this` context when extracting methods from objects.

### The Problem: Lost `this` Context
```typescript
class Timer {
  seconds = 0;
  
  tick() {  // Method loses reference to the instance
    this.seconds++;  // ❌ `this` is undefined!
  }
}

const timer = new Timer();
const tick = timer.tick;
tick();  // ❌ Error: Cannot read property 'seconds' of undefined
```

This happens in real scenarios:
- **Event handlers**: Button clicks, DOM events
- **Callbacks**: setTimeout, Promise.then
- **Array methods**: forEach, map callbacks
- **Any time you pass a method as a function reference**

### Lecture 139: Creating a Method Decorator
#### Signature
```typescript
function autobind(
  target: (...args: any[]) => any,        // Original method
  context: ClassMethodDecoratorContext     // Metadata
) {
  // Can return a replacement function
  return function(this: any, ...args: any[]) {
    return target.call(this, ...args);   // Call with correct `this`
  };
}
```

#### Parameters
| Parameter | Type | Purpose |
|-----------|------|---------|
| `target` | `(...args) => any` | The **original method function** |
| `context` | `ClassMethodDecoratorContext` | **Metadata** (name, kind, addInitializer, etc.) |

#### Key Rules
1. ✅ **Class field initialization runs after decorator processing**
2. ✅ **Methods are decorated during class definition**
3. ✅ **Decorator receives the actual function** (target), not just metadata

### Lecture 140: Using Decorators To Solve A Common Problem
#### Real-World Example: Event Handlers
```typescript
class Button {
  text = "Click me!";
  clicks = 0;
  
  @autobind
  handleClick() {
    this.clicks++;  // ✅ `this` works correctly
    console.log(`Clicked ${this.clicks} times`);
  }
}

// Without @autobind:
<button onclick={button.handleClick}>  // ❌ `this` breaks when called by DOM
// With @autobind:
<button onclick={button.handleClick}>  // ✅ Works perfectly
```

### Lecture 141: Implementing A Decorator-based Solution
#### Complete Implementation
```typescript
function autobind(
  target: (...args: any[]) => any,
  context: ClassMethodDecoratorContext
) {
  // 🔥 CRITICAL: Add initializer for constructor-time binding
  context.addInitializer(function(this: any) {
    this[context.name as string] = this[context.name as string].bind(this);
  });
  
  // 🔥 Return replacement function
  return function(this: any, ...args: any[]) {
    return target.apply(this, args);
  };
}
```

#### How It Works
1. **Decorator runs at class definition**
2. **`addInitializer` registers constructor logic**
3. **Each instance gets bound method via `bind()`**
4. **Replacement function calls original with correct context**

#### Why Use `addInitializer` Instead of Immediate Binding
```typescript
// ❌ WRONG: Binds to wrong context
@autobind
class Person {
  name = "usama";
  greet() { console.log("Hi, I am " + this.name); }
}
// Constructor runs in THIS context:
const p1 = new Person();  // ✅ Works - initializer runs AFTER constructor body
```

### Lecture 142: Replacing Methods with Decorators
#### Replacement Pattern
```typescript
function timed(target: Function, context: ClassMethodDecoratorContext) {
  return function(this: any, ...args: any[]) {
    const start = Date.now();
    const result = target.apply(this, args);  // Preserve `this`
    console.log(`${String(context.name)} took ${Date.now() - start}ms`);
    return result;
  };
}

// Usage:
class Service {
  @timed
  expensiveOperation(items: string[]) {
    console.log("Processing:", items);
    return items.length;
  }
}
```

#### Advanced Pattern: Argument Enhancement
```typescript
function logArgs(target: Function, context: ClassMethodDecoratorContext) {
  return function(this: any, ...args: any[]) {
    console.log(`${String(context.name)} called with:`, args);
    // Can modify arguments before calling original!
    const result = target.apply(this, args);
    console.log(`${String(context.name)} returned:`, result);
    return result;
  };
}
```

### `bind()` vs `apply()` - Your Key Question Answered
| Method | Behavior | Use Case |
|--------|----------|----------|
| **`bind(this)`** | **Permanently** sets `this`; returns **new function** | When you want to save the binding for future calls |
| **`apply(this, args)`** | **Temporarily** sets `this`; calls immediately | When you want to call NOW with correct context |

```typescript
// In addInitializer: this[ctx.name] = this[ctx.name].bind(this)
// → bind PERMANENTLY sets `this` for future calls

// In return function: target.apply(this)
// → apply TEMPORARILY sets `this` to call original method NOW
```

### Best Practices
1. ✅ **Always return** the replacement function
2. ✅ **Use `addInitializer`** to bind instance methods
3. ✅ **Preserve `this` context** with `.call()` or `.apply()`
4. ✅ **Consider TypeScript types** for method parameters
5. ✅ **Use `context.name as string`** when accessing method name

---

## Lecture 143: Introducing the Field Decorator

### Overview

Field decorators **intercept and transform class field values** at the moment they are being assigned. Unlike method decorators (which replace functions), field decorators replace the **assignment process itself**—they act as gatekeepers for new property values.

### Key Insight: Fields vs Methods

| Aspect | Field Decorator | Method Decorator |
|--------|----------------|------------------|
| **Target Parameters** | `undefined, ClassFieldDecoratorContext` | `Function, ClassMethodDecoratorContext` |
| **Decorator Return** | Initializer/transformer function | Replacement function |
| **Field Value Access** | Via `initialValue` parameter | Via closure/`this` |
| **Assignment Timing** | During constructor execution | At class definition |

### Basic Structure

```typescript
function logProperty(target: undefined, context: ClassFieldDecoratorContext) {
  console.log(`Decorator running for field: ${context.name}`);
  
  // Return the "magic" function that will process values
  return function(initialValue: string) {
    console.log(`Property ${String(context.name)} being set to ${initialValue}`);
    return initialValue.toUpperCase(); // Transform the value
  };
}

class User {
  @logProperty
  username = "usama"; // When you do `new User()`, this transformer runs
}

const user = new User();
// Console output:
// "Decorator running for field: username"
// "Property username being set to usama"
console.log(user.username); // "USAMA"
```

### Your Implementation

Looking at your code, here's how field decorators relate:

```typescript
// Field Decorator Signature:
function myFieldDecorator(target: undefined, context: ClassFieldDecoratorContext) {
  // Return a transformer function
  return (value: any) => {
    // This runs when the field is initialized
    return transformedValue;
  };
}
```

### Common Patterns

1. **Normalization**:
   ```typescript
   function normalize(target: undefined, ctx: ClassFieldDecoratorContext) {
     return (value: string) => value.trim().toLowerCase();
   }
   ```

2. **Validation**:
   ```typescript
   function required(target: undefined, ctx: ClassFieldDecoratorContext) {
     return (value: any) => {
       if (!value) throw new Error(`Field ${ctx.name} is required`);
       return value;
     };
   }
   ```

3. **Logging**:
   ```typescript
   function trace(target: undefined, ctx: ClassFieldDecoratorContext) {
     return (value: any) => {
       console.log(`${ctx.name} initialized to ${value}`);
       return value;
     };
   }
   ```

### Why This Matters

Field decorators provide **data quality control** at the point where class fields are defined:
- **Validation**: Prevent invalid data from entering the system
- **Normalization**: Ensure consistent formatting (emails, names, etc.)
- **Security**: Sanitize inputs before they're stored
- **Debugging**: Log what's happening during object construction
- **Developer Experience**: Automatic data processing without boilerplate

### Real-World Example

```typescript
function sanitizeHtml(target: undefined, context: ClassFieldDecoratorContext) {
  return (value: string) => {
    // Remove potentially dangerous characters
    return value.replace(/[<>]/g, '');
  };
}

class Comment {
  @sanitizeHtml
  content = "Hello <script>alert('xss')</script> World";
}

const comment = new Comment();
console.log(comment.content); // "Hello scriptalert('xss')script World"
```

### Best Practices

1. ✅ **Always return a transformer function**
2. ✅ **Handle all value types gracefully**
3. ✅ **Use `context.name` for better logging**
4. ✅ **Consider combining with method decorators**
5. ✅ **Document side effects clearly**

### When to Use Field Decorators

- **Input validation at the class level**
- **Normalizing data formats** (uppercase, formatting)
- **Tracing/debugging object construction**
- **Sanitizing user-provided data**
- **Adding default values conditionally**

### Comparison with Your Approach

Your method decorator implementation:
```typescript
function autobind(target: (...args: any[]) => any, ctx: ClassMethodDecoratorContext) {
  // target contains the actual method
  return function(this: any) { /* ... */ };
}
```

Field decorators work similarly but:
- The "target" is always `undefined`
- You return a **transformer function** instead of a replacement method
- The transformer receives the `initialValue`

---

## Lecture 135: Types of Decorators

**Instructor's note:** Decorators are an Object-Oriented Programming feature that lets you modify classes, methods, properties, and getters/setters.
