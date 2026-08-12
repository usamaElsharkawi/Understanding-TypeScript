// === Multiple Generic Parameters Example ===

// 1. Classic merge — each argument gets its own type parameter
function merge<A, B>(objA: A, objB: B): A & B {
  return { ...objA, ...objB };
}

const merged = merge({ name: "usama" }, { age: 34 });
// A = { name: string }, B = { age: number }
// Result: { name: string; age: number } (intersection type!)
console.log(merged); // { name: "usama", age: 34 }
console.log(merged.name); // "usama"
console.log(merged.age);  // 34

// 2. swap — two type parameters, tuples swap positions
function swap<A, B>(pair: [A, B]): [B, A] {
  return [pair[1], pair[0]];
}

const swapped = swap([1, "two"]);
// A = number (from 1), B = string (from "two")
// Result: [string, number]
console.log(swapped); // ["two", 1]

// 3. Generic key-value mapping — K and V play different roles
function makeMap<K extends string, V>(key: K, value: V): Record<K, V> {
  return { [key]: value } as Record<K, V>;
}

const nameMap = makeMap("username", "usama");
// K = "username" (literal), V = string
console.log(nameMap); // { username: "usama" }
console.log(nameMap.username); // "usama"

// 4. Multiple type parameters with constraints on each
function mergeObjects<A extends object, B extends object>(objA: A, objB: B): A & B {
  return { ...objA, ...objB };
}

const combined = mergeObjects({ id: 1 }, { role: "admin" });
// Both A and B must be objects
console.log(combined); // { id: 1, role: "admin" }

// Uncomment to see the constraint error:
// mergeObjects({ name: "usama" }, 42); // ❌ number does not extend object