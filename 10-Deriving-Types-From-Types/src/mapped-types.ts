type Operations = {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
};

type Results<T> = {
  [K in keyof T]?: number;
};


// type Operations = {
//   add?: (a: number, b: number) => number;
//   subtract?: (a: number, b: number) => number;
// };

// type Results<T> = {
//   [K in keyof T]-?: number;
// };

const mathOperations: Operations = {
  add(a: number, b: number) {
    return a + b;
  },
  subtract(a: number, b: number) {
    return a - b;
  },
};

const res: Results<Operations> = {
  add: mathOperations.add(7, 6),
  subtract: mathOperations.subtract(77, 44),
};

console.log(res);
