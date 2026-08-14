type User = { name: string; age: number };

type UserKey = keyof User;

let validkey: UserKey;

validkey = "age";

function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
  const val = obj[key];

  if (val === undefined || val === null) {
    throw new Error("Accessing undefined or null");
  }

  return val;
}


const user = { name: "usama", age: 33 };

const name = getProp(user,'age')

console.log(name)
