# Classes & Interfaces - Lecture Documentation

## Course Structure
- **67**: Module Introduction
- **68**: What are Classes?
- **69**: Creating a First Class
- **70**: A Useful TypeScript Shortcut
- **71**: Making Sense of "public" and "private"
- **72**: Making Fields "readonly"
- **73**: Understanding Getters
- **74**: Setting Values with Setters
- **75**: Exploring Static Properties & Methods

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

## Lecture 73: Understanding Getters
Getters are special methods that allow you to control how properties are accessed. They're called like regular properties (without parentheses) but execute custom logic to return a value.

```typescript
class User {
    constructor(
        private firstName: string,
        private lastName: string
    ) {}

    // Getter - accessed like a property, but executes this method
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

const usama = new User('Usama', 'Mohamed');
console.log(usama.fullName);  // "Usama Mohamed" - called WITHOUT parentheses!
```

### Why Use Getters?
- **Encapsulation**: Hide internal data (private fields) while exposing a public interface
- **Computed properties**: Calculate values on-the-fly instead of storing them
- **Validation**: Add logic before returning a value
- **Clean API**: Users access `.fullName` like a property, not a method

### Key Points:
- Getters are called WITHOUT parentheses: `user.fullName` not `user.fullName()`
- They can return any value type
- They typically have no parameters
- They work with private fields to provide controlled access

### Example: Computed Properties
```typescript
class Circle {
    constructor(private _radius: number) {}

    get area(): number {
        return Math.PI * this._radius ** 2;
    }

    get diameter(): number {
        return this._radius * 2;
    }
}

const circle = new Circle(5);
console.log(circle.area);      // 78.54 (computed automatically)
console.log(circle.diameter);  // 10 (computed automatically)
```

## Lecture 74: Setting Values with Setters
Setters are special methods that control how properties are assigned values. They let you validate and transform data before it's stored in a private backing field.

```typescript
class User {
    private _firstName = "";
    private _lastName = "";

    set firstName(value: string) {
        if (value.trim() === '') {
            throw new Error("You must enter your first name")
        }
        this._firstName = value;
    }

    set lastName(value: string) {
        if (value.trim() === '') {
            throw new Error("You must enter your last name")
        }
        this._lastName = value;
    }
    
    get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
}

const usama = new User()
usama.firstName = "usama"
usama.lastName = "el sharkawi"

console.log(usama.fullName);  // "usama el sharkawi"
```

### Why Use Setters?
- **Validation**: Ensure values meet criteria before storing
- **Data transformation**: Format or modify data before assignment
- **Error prevention**: Catch invalid values early
- **Encapsulation**: Keep private backing fields safe from invalid data

### Key Points:
- Setters are called like property assignment: `user.firstName = "value"`
- They must have exactly ONE parameter
- They typically return `void` (no return value)
- They work with private fields (`_firstName`) to store validated data
- Common naming convention: private fields use underscore prefix (`_fieldName`)

### Getter + Setter Pattern:
```typescript
class BankAccount {
    private _balance: number = 0;
    
    // Getter - controls how we READ the value
    get balance(): number {
        return this._balance;
    }
    
    // Setter - controls how we WRITE the value
    set balance(amount: number) {
        if (amount < 0) {
            throw new Error("Balance cannot be negative!");
        }
        this._balance = amount;
    }
}

const account = new BankAccount();
account.balance = 1000;      // ✅ Valid - calls setter
console.log(account.balance); // 1000 - calls getter
// account.balance = -500;   // ❌ Error - setter validation blocks it
```

### Computed Properties (Getter Only):
Not all properties need setters. Computed properties are derived from other values:

```typescript
class Circle {
    constructor(private _radius: number) {}
    
    // This is computed - no setter needed
    get area(): number {
        return Math.PI * this._radius ** 2;
    }
    
    // This can be set
    get radius(): number {
        return this._radius;
    }
    
    set radius(value: number) {
        if (value < 0) {
            throw new Error("Radius cannot be negative!");
        }
        this._radius = value;
    }
}

const circle = new Circle(5);
console.log(circle.area);  // 78.54 (computed automatically)
circle.radius = 10;        // ✅ Valid
console.log(circle.area);  // 314.16 (automatically recalculated)
// circle.area = 100;      // ❌ Error - no setter for computed property
```

## Lecture 75: Exploring Static Properties & Methods
Static members belong to the **class itself** rather than to individual instances. They're shared across all instances of the class.

```typescript
class User {
    // Static property - belongs to the CLASS (shared by all instances)
    static totalUsers: number = 0;
    
    // Instance property - belongs to EACH object
    name: string;
    
    constructor(name: string) {
        this.name = name;
        User.totalUsers++;  // Access static property through class name
    }
}

const user1 = new User("Alice");
const user2 = new User("Bob");

// Access static property through the CLASS (not instance)
console.log(User.totalUsers);  // 2 - tracks ALL users

// ❌ This won't work - static properties don't belong to instances
// console.log(user1.totalUsers);  // Error!
```

### Static Methods:
```typescript
class MathHelper {
    // Static method - can be called without creating an instance
    static add(a: number, b: number): number {
        return a + b;
    }
    
    static celsiusToFahrenheit(celsius: number): number {
        return (celsius * 9/5) + 32;
    }
    
    // Instance method - needs an instance to call
    multiply(a: number): number {
        return a * 2;
    }
}

// ✅ Call static methods directly on the class
console.log(MathHelper.add(5, 3));  // 8
console.log(MathHelper.celsiusToFahrenheit(25));  // 77

// ❌ Can't call instance method without instance
// MathHelper.multiply(5);  // Error!

// ✅ Must create instance for instance methods
const helper = new MathHelper();
console.log(helper.multiply(5));  // 10
```

### Real-World Example - Counter:
```typescript
class Employee {
    static employeeCount: number = 0;
    
    public id: string;
    public name: string;
    
    constructor(name: string) {
        this.id = `EMP-${Date.now()}`;
        this.name = name;
        Employee.employeeCount++;
    }
}

const emp1 = new Employee("Alice");
const emp2 = new Employee("Bob");
const emp3 = new Employee("Charlie");

console.log(Employee.employeeCount);  // 3 - company-wide count
```

### Utility Functions (Static Methods):
```typescript
class StringUtils {
    static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    static reverse(str: string): string {
        return str.split('').reverse().join('');
    }
}

// Use directly without creating object
console.log(StringUtils.capitalize("hello"));  // "Hello"
console.log(StringUtils.reverse("hello"));     // "olleh"
```

### Key Points:
- **Static properties/methods** belong to the class itself, not instances
- Access them via `ClassName.property` or `ClassName.method()`
- Cannot access instance properties/methods from static methods (no `this`)
- Use for: counters, utility functions, constants, configuration
- All instances share the same static property (one copy total)

### Static vs Instance:
| Feature | Static | Instance |
|---------|--------|----------|
| **Access via** | `ClassName.member` | `instance.member` |
| **Memory** | One shared copy | Separate copy per instance |
| **Use case** | Utilities, counters, config | Object-specific data |
| **Can access** | Other static members | Both static and instance |

## Next Up: Lecture 76
We'll cover inheritance next, which allows classes to inherit properties and methods from other classes.

## Configuration

This section uses TypeScript with:
- ES6+ target for modern syntax support
- Strict mode enabled for type safety
- CommonJS modules

## Files

- `basics.ts` - Basic class examples
- `tsconfig.json` - TypeScript configuration
- `README.md` - Documentation
