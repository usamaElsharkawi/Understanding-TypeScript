"use strict";
// class User{
//     name = 'usama'
//     age:number
//     constructor(name:string,age:number){
//         this.name = name;
//         this.age = age
//     }
// }
Object.defineProperty(exports, "__esModule", { value: true });
// const max = new User("max",34)
// console.log(max.name,max.age)
class User {
    name;
    age;
    hoppies = [];
    constructor(hoppis, name, age) {
        this.name = name;
        this.age = age;
        this.hoppies = hoppis;
    }
}
const max = new User(['bla', "bla", "bla"], "max", 34);
console.log(max.name, max.age, max.hoppies);
//# sourceMappingURL=basics.js.map