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
