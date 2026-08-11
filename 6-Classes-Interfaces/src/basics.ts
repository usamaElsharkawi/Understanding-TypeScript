// class User{
//     name = 'usama'
//     age:number
//     constructor(name:string,age:number){
//         this.name = name;
//         this.age = age
//     }
// }

// const max = new User("max",34)
// console.log(max.name,max.age)


class User{
    readonly hoppies:string[]  = [];
    constructor( hoppis:string[],public name:string, public age:number){
        this.hoppies = hoppis;
    }
}

const max = new User(['bla',"bla","bla"],"max",34)
console.log(max.name,max.age,max.hoppies)



