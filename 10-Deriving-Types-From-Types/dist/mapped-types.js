"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// type Operations = {
//   add?: (a: number, b: number) => number;
//   subtract?: (a: number, b: number) => number;
// };
// type Results<T> = {
//   [K in keyof T]-?: number;
// };
const mathOperations = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    },
};
const res = {
    add: mathOperations.add(7, 6),
    subtract: mathOperations.subtract(77, 44),
};
console.log(res);
//# sourceMappingURL=mapped-types.js.map