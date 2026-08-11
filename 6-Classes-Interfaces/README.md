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
- **76**: Understanding Inheritance
- **77**: The "protected" Modifier

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

## Lecture 76: Understanding Inheritance
Inheritance allows a class to inherit properties and methods from another class, creating a parent-child relationship.

```typescript
// Parent class (Base class)
class Animal {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    eat(): void {
        console.log(`${this.name} is eating`);
    }
    
    sleep(): void {
        console.log(`${this.name} is sleeping`);
    }
}

// Child class (Derived class) - inherits from Animal
class Dog extends Animal {
    breed: string;
    
    constructor(name: string, breed: string) {
        super(name);  // Call parent constructor
        this.breed = breed;
    }
    
    bark(): void {
        console.log(`${this.name} says: Woof!`);
    }
}

const myDog = new Dog("Max", "Golden Retriever");

// Inherited from Animal
myDog.eat();      // "Max is eating"
myDog.sleep();    // "Max is sleeping"

// Dog's own method
myDog.bark();     // "Max says: Woof!"
```

### Key Concepts:

**`extends`** - Creates the inheritance relationship  
**`super()`** - Calls the parent constructor (MUST be called in child constructor)  
**`super.method()`** - Calls parent method from child class

### Method Overriding:
```typescript
class Animal {
    makeSound(): void {
        console.log(`${this.name} makes a sound`);
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log(`${this.name} says: Meow!`);
    }
}

const cat = new Cat("Whiskers");
cat.makeSound();  // "Whiskers says: Meow!"
```

### Using `super` to Access Parent Methods:
```typescript
class Animal {
    makeSound(): void {
        console.log(`${this.name} makes a generic sound`);
    }
}

class Dog extends Animal {
    makeSound(): void {
        super.makeSound();  // Call parent method first
        console.log(`${this.name} barks loudly!`);
    }
}

const dog = new Dog("Max");
dog.makeSound();
// Output:
// "Max makes a generic sound"
// "Max barks loudly!"
```

### Real-World Example:
```typescript
class Product {
    id: string;
    name: string;
    price: number;
    
    constructor(id: string, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    
    getInfo(): string {
        return `${this.name} - $${this.price}`;
    }
}

class Book extends Product {
    author: string;
    pages: number;
    
    constructor(id: string, name: string, price: number, author: string, pages: number) {
        super(id, name, price);
        this.author = author;
        this.pages = pages;
    }
    
    getInfo(): string {
        return `${super.getInfo()} by ${this.author}`;
    }
}

const book = new Book("B001", "TypeScript Guide", 29.99, "Max", 350);
console.log(book.getInfo());  // "TypeScript Guide - $29.99 by Max"
```

### Key Points:
- Child classes inherit **public** and **protected** members from parent
- Child classes do **NOT** inherit private members
- Must call `super()` before using `this` in child constructor
- Can override parent methods to provide custom implementation
- Use `super.method()` to call parent's version of an overridden method
- Use `instanceof` to check if an object is an instance of a class

## Lecture 77: The "protected" Modifier
The `protected` modifier allows access within the class and its subclasses, but not from external code. Think of it as "family-only" access.

```typescript
class Animal {
    public name: string;           // Accessible everywhere
    protected _energy: number;     // Accessible in class and subclasses
    private _dna: string;          // Accessible only in this class
    
    constructor(name: string, energy: number, dna: string) {
        this.name = name;
        this._energy = energy;
        this._dna = dna;
    }
    
    protected sleep(hours: number): void {
        this._energy += hours * 10;
    }
    
    getEnergy(): number {
        return this._energy;
    }
}

class Dog extends Animal {
    breed: string;
    
    constructor(name: string, energy: number, dna: string, breed: string) {
        super(name, energy, dna);
        this.breed = breed;
    }
    
    rest(hours: number): void {
        this.sleep(hours);  // ✅ Can access protected method
        console.log(`${this.name} rested for ${hours} hours`);
    }
    
    getDna(): string {
        // return this._dna;  // ❌ Error! Private members not inherited
        return "Cannot access DNA";
    }
}

const dog = new Dog("Max", 100, "ATGCC", "Golden Retriever");

console.log(dog.name);  // "Max" ✅ - public
// console.log(dog._energy);  // ❌ Error! Protected from external code
// dog.sleep(5);              // ❌ Error! Protected from external code

dog.rest(5);  // ✅ OK - Dog can call protected method
console.log(dog.getEnergy());  // ✅ OK - through public method
```

### Access Comparison:

| Modifier | Own Class | Subclass | External Code |
|----------|-----------|----------|---------------|
| `public` | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ❌ |
| `private` | ✅ | ❌ | ❌ |

### Use Case: Template Method Pattern
```typescript
abstract class DataProcessor {
    process(data: string): void {
        this.validate(data);
        this.transform(data);
        this.save(data);
    }
    
    protected abstract validate(data: string): void;
    protected abstract transform(data: string): void;
    protected abstract save(data: string): void;
}

class CsvProcessor extends DataProcessor {
    protected validate(data: string): void {
        console.log("Validating CSV...");
    }
    
    protected transform(data: string): void {
        console.log("Converting to JSON...");
    }
    
    protected save(data: string): void {
        console.log("Saving to database...");
    }
}
```

### Use Case: Shared Internal State
```typescript
class Vehicle {
    protected _speed: number = 0;
    protected _isRunning: boolean = false;
    
    start(): void {
        this._isRunning = true;
    }
}

class Car extends Vehicle {
    accelerate(amount: number): void {
        if (!this._isRunning) {
            console.log("Start the car first!");
            return;
        }
        this._speed += amount;  // ✅ Can access protected _speed
        console.log(`Speed: ${this._speed} mph`);
    }
}
```

### Protected Constructor:
Prevent direct instantiation but allow inheritance:

```typescript
class Shape {
    protected constructor(public color: string) {}
}

class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);  // ✅ OK - can call protected constructor
    }
}

// const shape = new Shape("red");  // ❌ Error! Constructor is protected
const circle = new Circle("blue", 5);  // ✅ OK
```

### Key Points:
- `protected` members are accessible in the class and its subclasses
- Child classes inherit `protected` members from parent
- `protected` members are NOT accessible from external code
- Use `protected` for internal implementation that subclasses need
- Use `protected` constructors for abstract/base classes

## Lecture 78: Making Sense Of Abstract Classes
Abstract classes are special classes that **cannot be instantiated directly** - they're meant to be extended by other classes. They can have both abstract methods (no implementation) and concrete methods (with implementation).

```typescript
abstract class Vehicle {
    public color: string;
    
    constructor(color: string) {
        this.color = color;
    }
    
    // Abstract method - MUST be implemented by child classes
    abstract start(): void;
    abstract stop(): void;
    
    // Concrete method - HAS implementation, CAN be overridden
    getFuelType(): string {
        return "Gasoline";
    }
    
    // Concrete method - CAN be overridden
    honk(): void {
        console.log("Beep beep!");
    }
}

class Car extends Vehicle {
    start(): void {
        console.log("Starting car with key...");
    }
    
    stop(): void {
        console.log("Stopping car with brakes...");
    }
    
    getFuelType(): string {
        return "Electric";  // Override parent's "Gasoline"
    }
    
    honk(): void {
        console.log("Honk honk! 🚗");  // Override parent's "Beep beep!"
    }
}

// ❌ CANNOT instantiate abstract class
// const vehicle = new Vehicle("blue");  // Error!

const car = new Car("red");  // ✅ OK - Car is not abstract
car.start();  // "Starting car with key..."
```

### Key Points:
- **`abstract` class** - Cannot be instantiated directly
- **`abstract` method** - Has no implementation, MUST be overridden
- **Concrete method** - Has implementation, CAN be overridden
- Child classes **MUST** implement all abstract methods
- Child classes use `extends` to inherit from abstract class

### Real-World Example:
```typescript
abstract class PaymentProcessor {
    amount: number;
    
    constructor(amount: number) {
        this.amount = amount;
    }
    
    abstract processPayment(): boolean;
    abstract refund(transactionId: string): boolean;
    
    validateAmount(): boolean {
        if (this.amount <= 0) throw new Error("Invalid amount");
        return true;
    }
}

class CreditCardProcessor extends PaymentProcessor {
    processPayment(): boolean {
        console.log(`Processing credit card payment of $${this.amount}`);
        return true;
    }
    
    refund(transactionId: string): boolean {
        console.log(`Refunding transaction ${transactionId}`);
        return true;
    }
}

class PayPalProcessor extends PaymentProcessor {
    processPayment(): boolean {
        console.log(`Processing PayPal payment of $${this.amount}`);
        return true;
    }
    
    refund(transactionId: string): boolean {
        console.log(`Refunding PayPal transaction ${transactionId}`);
        return true;
    }
}
```

## Abstract Classes vs Interfaces

### Key Differences:

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| **Implementation** | ✅ Can have concrete methods (actual code) | ❌ Only defines structure (method signatures) |
| **Properties** | ✅ Can declare and initialize properties | ❌ Only declares property types (no initialization) |
| **Inheritance** | Single inheritance (`extends` one class) | Multiple interfaces can be implemented (`implements A, B, C`) |
| **When to Use** | Partial implementation + contract | Contract/structure only |
| **Instantiation** | ❌ Cannot be instantiated | ❌ Cannot be instantiated |

### Quick Comparison:

```typescript
// Abstract Class - provides partial implementation
abstract class Animal {
    sleep() {  // ✅ Has actual code
        console.log("Sleeping...");
    }
    
    abstract makeSound(): void;  // Must be implemented
}

// Interface - only defines structure
interface Flyable {
    fly(): void;  // Only signature, no code
}

// Class extends ONE abstract class, implements MULTIPLE interfaces
class Bird extends Animal implements Flyable {
    makeSound() { console.log("Chirp!"); }
    fly() { console.log("Flying..."); }
    // Inherits sleep() from Animal
}
```

### Summary:
- **Abstract Class**: "Here's some code you can use, plus some methods you must implement"
- **Interface**: "Here's what you must have (structure only, no code)"

## Lecture 79: Introducing Interfaces
Interfaces define contracts or blueprints for objects - specifying what properties and methods an object should have, without providing any implementation.

```typescript
// Define an interface
interface Person {
    name: string;
    age: number;
}

// Use the interface - TypeScript checks compliance
const person1: Person = {
    name: "Alice",
    age: 30
};

// ✅ Valid - has all required properties
const person2: Person = {
    name: "Bob",
    age: 25
};

// ❌ Error - missing required property
// const person3: Person = {
//     name: "Charlie"
//     // Error: Property 'age' is missing
// };
```

### Why Use Interfaces?

#### 1. Type Safety for Objects
```typescript
interface Product {
    id: string;
    name: string;
    price: number;
}

const product: Product = {
    id: "P001",
    name: "Laptop",
    price: 999
};

// ❌ Error - missing 'price'
// const badProduct: Product = {
//     id: "P002",
//     name: "Mouse"
// };
```

#### 2. Function Parameters
```typescript
interface User {
    name: string;
    age: number;
}

function greetUser(user: User) {
    return `Hello ${user.name}, you are ${user.age} years old`;
}

greetUser({ name: "Alice", age: 30 });  // ✅ OK

// ❌ Error - wrong structure
// greetUser({ name: "Bob" });  // Missing 'age'
```

### Optional Properties:
Use `?` to make properties optional:

```typescript
interface User {
    name: string;           // Required
    age: number;            // Required
    email?: string;         // Optional
    phone?: string;         // Optional
}

const user1: User = {
    name: "Alice",
    age: 30
};

const user2: User = {
    name: "Bob",
    age: 25,
    email: "bob@example.com"
};
```

### Readonly Properties:
```typescript
interface User {
    readonly id: string;    // Cannot be modified
    name: string;
    age: number;
}

const user: User = {
    id: "USER-001",
    name: "Alice",
    age: 30
};

// ❌ Error - readonly property cannot be changed
// user.id = "USER-002";  // Error!
```

### Extending Interfaces:
```typescript
// Base interface
interface Person {
    name: string;
    age: number;
}

// Extended interface - includes everything from Person PLUS email
interface Employee extends Person {
    employeeId: string;
    department: string;
    email: string;
}

const employee: Employee = {
    name: "Alice",
    age: 30,
    employeeId: "EMP-001",
    department: "Engineering",
    email: "alice@company.com"
};
```

### Key Points:
- **Interfaces define contracts** - specify what properties/methods an object must have
- **No implementation** - interfaces only define structure, no code
- **Cannot be instantiated** - use them to type-check objects, not create them
- **Optional properties** - use `?` for properties that may not exist
- **Readonly properties** - use `readonly` for properties that cannot be changed
- **Extending interfaces** - use `extends` to build on existing interfaces
- **Compile-time only** - interfaces are removed from JavaScript output

## Lecture 81: Interfaces As Object Types
Interfaces can be used interchangeably with object type annotations. In fact, interfaces are often preferable to type aliases for defining object shapes because of features like declaration merging.

### Interfaces vs Type Aliases for Objects:
```typescript
// Using an INTERFACE
interface User {
    name: string;
    age: number;
}

// Using a TYPE ALIAS
type UserType = {
    name: string;
    age: number;
};

// Both work the same way for object typing
const user1: User = { name: "Alice", age: 30 };
const user2: UserType = { name: "Bob", age: 25 };
```

### Declaration Merging (Unique to Interfaces!)
This is a killer feature - interfaces can be merged:

```typescript
// First declaration
interface User {
    name: string;
    age: number;
}

// Second declaration - MERGES with first!
interface User {
    email: string;
    isActive: boolean;
}

// Result: User now has ALL properties
const user: User = {
    name: "Alice",
    age: 30,
    email: "alice@example.com",
    isActive: true
};

// Type aliases CANNOT do this:
// type User = { name: string };
// type User = { age: number };  // ❌ Error!
```

### Interfaces with Methods:
```typescript
interface Animal {
    name: string;
    makeSound(): void;
    eat(food: string): void;
}

const dog: Animal = {
    name: "Max",
    makeSound(): void {
        console.log("Woof!");
    },
    eat(food: string): void {
        console.log(`${this.name} is eating ${food}`);
    }
};
```

### Interfaces with Optional and Readonly:
```typescript
interface Car {
    readonly make: string;
    readonly model: string;
    year: number;
    color?: string;
    features?: string[];
    start?(): void;
}

const myCar: Car = {
    make: "Toyota",
    model: "Camry",
    year: 2023
};

if (myCar.start) {
    myCar.start();
}
```

### When to Use Interfaces vs Type Aliases:
| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Declaration merging | ✅ Yes | ❌ No |
| Extends other interfaces | ✅ Yes | ✅ Yes |
| Class implementation | ✅ Yes | ✅ Yes |
| Union types | ❌ No | ✅ Yes |
| Primitive types | ❌ No | ✅ Yes |

**Rule of thumb:**
- Use **interfaces** for object shapes
- Use **type aliases** for unions, primitives, tuples, or complex types

## Next Up: Lecture 82
We'll explore interfaces vs type aliases in more detail and learn about declaration merging.

This section uses TypeScript with:
- ES6+ target for modern syntax support
- Strict mode enabled for type safety
- CommonJS modules

## Files

- `basics.ts` - Basic class examples
- `tsconfig.json` - TypeScript configuration
- `README.md` - Documentation
