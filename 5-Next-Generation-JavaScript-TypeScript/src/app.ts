// Code goes here!

// const myName = "usama";
// myName = "max" //error

// >>with var you have a globle or a functional scope
//>>with let is block scope 

// var sum;

// function add(a:number,b:number){
//     sum = a+ b;
//     return sum
// }

// console.log(sum)



// if(true){
// var x = 1
// }

// console.log(x)


// if(true){
// let y = 1
// }

// console.log(y) //can not find y in the globle scope 



//==============================================

// Arrow functions

const add = (a:number , b:number = 2)=>{
    return a + b;
}

console.log(add(10,6))
console.log(add(10))

const numbers:1|-1 = 1

