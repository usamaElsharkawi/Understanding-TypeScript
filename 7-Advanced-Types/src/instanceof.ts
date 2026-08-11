// === Type Guards via instanceof Example ===

class User {
  name = "usama";
  greet() {
    console.log(`Hello, I'm ${this.name}!`);
  }
}

class Admin {
  role = "admin";
  manage() {
    console.log("Managing users...");
  }
}

function use(user: User | Admin) {
  if (user instanceof User) {
    // ✅ TypeScript narrows to User
    user.greet();
  } else {
    // ✅ TypeScript narrows to Admin
    user.manage();
  }
}

// --- Class Hierarchy Example (Inheritance) ---

class Animal {
  eat() {
    console.log("Eating...");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // ✅ Dog
    animal.eat();  // ✅ Inherited from Animal
  } else {
    animal.meow(); // ✅ Cat (TypeScript infers this)
    animal.eat();  // ✅ Inherited from Animal
  }
}

// --- Demo ---
const user = new User();
const admin = new Admin();
use(user);   // "Hello, I'm usama!"
use(admin);  // "Managing users..."

const dog = new Dog();
const cat = new Cat();
makeSound(dog); // "Woof!" → "Eating..."
makeSound(cat); // "Meow!" → "Eating..."