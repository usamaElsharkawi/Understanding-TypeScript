function add2(a: number, b: number): number {
    return a + b;   
}

function log(message: string): void {
    console.log(message);
}

function throwError(message: string): never {
    throw new Error(message);
}


function performJop(cb:(msg:string) => void){
    //.....

    cb("Hello, world!");
}


type User ={
    name:string;
    age:number;
    role: "admin" | "user" | "guest";
    great: (msg:string) => string
}

const user:User = {
    name: "Usama",
    age: 26,
    role: "admin",
    great(msg:string){
        return `Hello ${msg}`
    }
}

console.log(user.great("Usama"));