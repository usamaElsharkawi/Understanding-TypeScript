// === Function Overloads Example ===

// Overload signatures — what callers see
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

// Implementation signature — hidden from callers
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return a + b; // string concatenation
  }
  return Number(a) + Number(b); // numeric addition
}

// ✅ Correct return types based on arguments
const strResult = combine("Hello", "World"); // Type: string
const numResult = combine(10, 20);           // Type: number

console.log(strResult); // "HelloWorld"
console.log(numResult); // 30

// ❌ Error: No matching overload — TypeScript catches this at compile time
// const mixed = combine("Hello", 5); // Uncomment to see the error

// --- Real-world example: flexible getter ---
function get<T>(obj: T[], index: number): T;
function get<T>(obj: Record<string, T>, key: string): T;
function get<T>(obj: T[] | Record<string, T>, key: string | number): T {
  return obj[key as keyof typeof obj] as T;
}

const scores = [98, 87, 92];
const firstScore = get(scores, 0); // ✅ Type: number (from array)

const userRoles = { alice: "admin", bob: "user" };
const aliceRole = get(userRoles, "alice"); // ✅ Type: string (from object)

console.log(firstScore);  // 98
console.log(aliceRole);   // "admin"