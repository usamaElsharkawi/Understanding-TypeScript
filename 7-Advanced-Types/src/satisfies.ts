// === satisfies Keyword Example ===

// 1. Type to validate against
type Role = "admin" | "editor" | "viewer";
type Permissions = Record<Role, string[]>;

// 2. Without satisfies — literal types are lost with `as`
const permissionsAs = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
} as Permissions;
// permissionsAs["admin"] is: string[] (literal types lost!)

// 3. With satisfies — type is validated BUT literal types are preserved
const permissions = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
} satisfies Permissions;

// permissions["admin"] is still: string[]
// But TypeScript validated the structure at compile time!
console.log(permissions.admin);   // ["read", "write", "delete"]
console.log(permissions.viewer);   // ["read"]

// 4. Real-world example — Color Palette
type Palette = {
  primary: string;
  secondary: string;
  accent: string;
};

const palette = {
  primary: "#007acc",
  secondary: "#ff6b6b",
  accent: "#ffd93d",
} satisfies Palette;

// Without satisfies (using `as`), palette.primary would be: string
// With satisfies, TypeScript still knows it's "#007acc" — the literal type!
console.log(palette.primary);   // "#007acc"
console.log(palette.accent);    // "#ffd93d"

// 5. Error detection — satisfies catches problems
type Config = {
  apiUrl: string;
  timeout: number;
  retries: number;
};

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
} satisfies Config;

// Uncomment to see errors:
// const badConfig = {
//   apiUrl: "https://api.example.com",
//   timeout: 5000,
//   // ❌ Missing "retries" property
//   extra: "oops", // ❌ Excess property
// } satisfies Config;

console.log(config.apiUrl);   // "https://api.example.com"
console.log(config.timeout);  // 5000
console.log(config.retries);  // 3