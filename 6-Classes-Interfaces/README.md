# Classes & Interfaces - Lecture Documentation

## Course Structure
- **67**: Module Introduction
- **68**: What are Classes?
- **69**: Creating a First Class
- **70**: A Useful TypeScript Shortcut
- **71**: Making Sense of "public" and "private"
- **72**: Making Fields "readonly"

## Lecture 67: Module Introduction
Welcome to the Classes & Interfaces section! This part of the course focuses on object-oriented programming in TypeScript. Classes are fundamental building blocks that allow you to bundle data and functionality together, making your code more organized and maintainable.

## Lecture 68: What are Classes?
Classes are templates/blueprints for creating objects in TypeScript (and JavaScript). They define:

1. **Properties** - Data fields that objects created from the class will have
2. **Methods** - Functions that define what the object can do
3. **Constructor** - Special function that runs when you create an instance of the class

Think of classes like cookie cutters - they define the shape, and you can make many cookies (objects) from the same cutter (class).

## Lecture 69: Creating a First Class
Here's our basic User class example:

```typescript
class User {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const max = new User("max", 34);
console.log(max.name, max.age);
```

This creates a class with two properties (`name` and `age`) that are initialized through the constructor when we create a new instance using the `new` keyword.

## Lecture 70: A Useful TypeScript Shortcut (Compiling JavaScript)
Instead of declaring properties separately and then assigning them in the constructor, TypeScript provides a cleaner approach called **parameter properties**. This shortcut reduces boilerplate code by automatically creating and assigning class properties from constructor parameters with access modifiers:

```typescript
class User {
    constructor(
        public name: string,   // TypeScript creates this.name automatically
        public age: number     // TypeScript creates this.age automatically
    ) {}
    
    // Equivalent to the longer version above - no need for separate property declarations!
}

const max = new User("max", 34);
console.log(max.name, max.age); // max 34
```

This is much cleaner than manually declaring properties and assigning them in the constructor!

## Lecture 71: Making Sense of "public" and "private"
TypeScript introduces access control modifiers that determine where class members can be accessed:

- **`public`** - Accessible from anywhere (default)
- **`private`** - Only accessible within the class itself
- **`protected`** - Accessible within the class and its subclasses (covered later)

### Public vs Private Example:
```typescript
class User {
    // Public property (default) - accessible everywhere
    public name: string;
    
    // Private property - only accessible within this class
    private _internalId: string;
    
    constructor(name: string, id: string) {
        this.name = name;
        this._internalId = id;
    }
    
    // Public method - accessible everywhere
    greet() {
        return `Hello, I am ${this.name}`;
    }
    
    // Private method - only accessible within this class
    private logInternal() {
        console.log(`Internal ID: ${this._internalId}`);
    }
}

const user = new User("Alice", "secret-id");
console.log(user.name);        // ✅ Works - public property
console.log(user.greet());     // ✅ Works - public method
// console.log(user._internalId);  // ❌ Error - private property!
// user.logInternal();              // ❌ Error - private method!
```

Private members help protect internal implementation details and prevent accidental misuse of your class.

## Lecture 72: Making Fields "readonly"
Sometimes you want properties that should only be set once and never changed afterward. The `readonly` modifier enforces this constraint:

```typescript
class User {
    readonly id: string;  // Can only be assigned once (in constructor)
    name: string;
    age: number;
    
    constructor(id: string, name: string, age: number) {
        this.id = id;    // ✅ OK - assigning for the first time
        this.name = name;
        this.age = age;
    }
    
    changeId(newId: string) {
        // this.id = newId;  // ❌ Error! Cannot assign to readonly property
    }
}

const user = new User("user-001", "Alice", 30);
// user.id = "user-002";  // ❌ Error! Cannot assign to readonly property
```

You can also combine `readonly` with parameter properties:

```typescript
class User {
    constructor(
        readonly id: string,      // Readonly property
        public name: string,      // Public property
        private _age: number      // Private property
    ) {}
}

const user = new User("user-001", "Alice", 30);
// user.id = "new-id";  // ❌ Error - readonly!
```

## Next Up: Lecture 73
We'll cover getters next, which allow you to control how properties are accessed and can transform values before returning them.

## Configuration

This section uses TypeScript with:
- ES6+ target for modern syntax support
- Strict mode enabled for type safety
- CommonJS modules

## Files

- `basics.ts` - Basic class examples
- `tsconfig.json` - TypeScript configuration
- `README.md` - Documentation
