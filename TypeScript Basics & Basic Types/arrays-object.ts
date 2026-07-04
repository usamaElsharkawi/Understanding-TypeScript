let hobbies = ["Sports", "Cooking"];

// hobbies.push(10); //error

// let users : (string|number)[]

let users: Array<string | number>; //genaric type

let possibleResults: [number, string] = [1, "Usama"]; //tuple
// possibleResults = [1,1]//error
// possibleResults = [1,"usama",-1]//error
possibleResults = [2, "ali"];

possibleResults.push(3, "ahmed"); //tuple can be extended but the type of the elements must match the tuple type
console.log(possibleResults);

const userObject: {
  name: string;
  age: number;
  hobbies: string[];
  role: { name: string; permissions: string[] };
} = {
  name: "Usama",
  age: 26,
  hobbies: ["Sports", "Cooking"],
  role: { name: "Admin", permissions: ["read", "write"] },
};


// const userObject: {   //error 
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: { name: string; permissions: string[] };
// } = {
//   name: "Usama",
//   age: 26,
  
// };


let val:{} = "some text" //any value that not null or undefined can be assigned to an empty object type


let data:Record<string, string | number> = {
  name: "Usama",
  age: 26,
  city: "Karachi",
  country: "Pakistan",
  zip: 12345,
};