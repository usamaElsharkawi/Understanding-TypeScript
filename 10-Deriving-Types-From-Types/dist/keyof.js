"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let validkey;
validkey = "age";
function getProp(obj, key) {
    const val = obj[key];
    if (val === undefined || val === null) {
        throw new Error("Accessing undefined or null");
    }
    return val;
}
const user = { name: "usama", age: 33 };
const name = getProp(user, 'age');
console.log(name);
//# sourceMappingURL=keyof.js.map