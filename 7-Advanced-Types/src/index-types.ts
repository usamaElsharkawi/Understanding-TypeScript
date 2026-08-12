// === Index Types Example ===

// 1. Index signatures — flexible objects with dynamic keys
type StringDictionary = { [key: string]: string };

const dict: StringDictionary = {
  hello: "world",
  foo: "bar",
};

// 2. keyof operator — union of all property names
type Person = {
  name: string;
  age: number;
  email: string;
};

type PersonKeys = keyof Person; // "name" | "age" | "email"

const someKey: PersonKeys = "name"; // ✅ valid
console.log(someKey); // "name"

// 3. Indexed access types — T[K] to look up a property type
type NameType = Person["name"]; // string
type NameOrEmail = Person["name" | "email"]; // string (union of both)

// 4. Generic pluck function using index type constraints
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: "usama",
  age: 34,
  email: "test@test.com",
};

const personName = pluck(person, "name"); // ✅ Type: string
const personAge = pluck(person, "age");   // ✅ Type: number
console.log(personName); // "usama"
console.log(personAge);  // 34
// pluck(person, "salary"); // ❌ Error — "salary" does not extend keyof Person