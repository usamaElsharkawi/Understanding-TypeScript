# Section 11: ECMAScript Decorators

## Course Structure

- **133.** Module Introduction
- **134.** What Are Decorators? And ECMAScript Decorators vs Experimental Decorators
- **135.** Exploring Different Types of Decorators
- **136.** Building a First Decorator
- **137.** Building a Class Decorator That Edits a Class
- **138.** Understanding Decorator Code Execution Order
- **139.** Creating a Method Decorator
- **140.** Using Decorators To Solve A Common Problem
- **141.** Implementing A Decorator-based Solution: autobind
- **142.** Replacing Methods with Decorators
- **143.** Introducing the Field Decorator
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
