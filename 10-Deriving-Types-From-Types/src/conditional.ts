type StrintArray = string[];
let text = "anyText";
type ElementType<T> = T extends any[] ? T[number] : never;

type Example1 = ElementType<StrintArray>;
type Example2 = ElementType<typeof text>;


