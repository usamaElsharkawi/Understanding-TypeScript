# Classes & Interfaces

This directory contains examples and notes about TypeScript classes and interfaces, building upon the foundation of TypeScript basics.

## What are Classes?

Classes are templates/blueprints for creating objects in TypeScript (and JavaScript). They define:

1. **Properties** - Data fields that objects created from the class will have
2. **Methods** - Functions that define what the object can do
3. **Constructor** - Special function that runs when you create an instance of the class

Think of classes like cookie cutters - they define the shape, and you can make many cookies (objects) from the same cutter (class).

## Why Use Classes?

Classes help organize and structure your code by:
- Grouping related data (properties) and behavior (methods) together
- Creating reusable object templates
- Making code more maintainable and readable

## TypeScript Enhancements Over JavaScript Classes

TypeScript adds several powerful features to JavaScript classes:

### 1. Type Annotations
```typescript
class Person {
  name: string;   // TypeScript knows this must be a string
  age: number;    // TypeScript knows this must be a number
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```
JavaScript: `class Person { constructor(name, age) { } }` - no type safety
TypeScript: `class Person { name: string; constructor(name: string) { } }` - type safety

### 2. Access Modifiers
TypeScript introduces access control:
- `public` - Accessible from anywhere (default)
- `private` - Only accessible within the class
- `protected` - Accessible within class and subclasses

### 3. readonly Properties
Properties that can only be assigned once (typically in constructor):
```typescript
class Person {
  readonly id: number;  // Must be assigned in constructor, can't be changed later
  constructor(id: number) {
    this.id = id;
  }
}
```

### 4. Parameter Properties
TypeScript shorthand for constructor assignment:
```typescript
class Person {
  constructor(public name: string, private age: number) {}
  // Creates and assigns this.name and this.age automatically
}
```

### 5. Getters and Setters
Special methods for controlling access to class properties:
```typescript
class Person {
  private _age: number = 0;
  
  get age() {
    return this._age;
  }
  
  set age(value: number) {
    if (value > 0) {
      this._age = value;
    }
  }
}
```

## Configuration

This section uses TypeScript with:
- ES6+ target for modern syntax support
- Strict mode enabled for type safety
- CommonJS modules

## Files

- `basics.ts` - Basic class examples
- `tsconfig.json` - TypeScript configuration
- `README.md` - Documentation
