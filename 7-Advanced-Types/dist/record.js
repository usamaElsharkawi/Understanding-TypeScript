"use strict";
// === Record Type Example ===
Object.defineProperty(exports, "__esModule", { value: true });
const roleDescriptions = {
    admin: "Full access to all resources",
    editor: "Can create, edit, and delete content",
    viewer: "Read-only access",
};
const rolePermissions = {
    admin: ["create", "read", "update", "delete"],
    editor: ["create", "read", "update"],
    viewer: ["read"],
};
console.log(roleDescriptions.admin); // "Full access to all resources"
console.log(rolePermissions.viewer); // ["read"]
// 2. Type safety — missing a key causes an error
// const incomplete: Record<Role, string> = {
//   admin: "Full access",
//   editor: "Can edit",
// }; // ❌ Error: Property 'viewer' is missing
// 3. Excess property prevention
// const extra: Record<Role, string> = {
//   admin: "Full access",
//   editor: "Can edit",
//   viewer: "Read only",
//   supervisor: "Extra", // ❌ Error: 'supervisor' is not assignable to type 'Role'
// };
// 4. Using Record with enums
var Permission;
(function (Permission) {
    Permission["Read"] = "READ";
    Permission["Write"] = "WRITE";
    Permission["Delete"] = "DELETE";
})(Permission || (Permission = {}));
const permissionLabels = {
    [Permission.Read]: "Can read documents",
    [Permission.Write]: "Can create and edit documents",
    [Permission.Delete]: "Can delete documents",
};
console.log(permissionLabels[Permission.Read]); // "Can read documents"
// 5. Dynamic Record creation with generics
function createRoleMap(roles, defaultValue) {
    const result = {};
    for (const role of roles) {
        result[role] = defaultValue;
    }
    return result;
}
const dynamicMap = createRoleMap(["admin", "editor", "viewer"], "default");
console.log(dynamicMap.admin); // "default"
console.log(dynamicMap.editor); // "default"
//# sourceMappingURL=record.js.map