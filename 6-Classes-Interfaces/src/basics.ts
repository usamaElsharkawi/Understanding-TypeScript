class User{
    name = 'usama'
    age:number
    constructor(name:string,age:number){
        this.name = name;
        this.age = age
    }
}

const max = new User("max",34)
console.log(max.name,max.age)