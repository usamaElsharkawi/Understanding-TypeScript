const userName = "usama";

console.log(typeof userName); //string >>it a js runtime operation

//but if you use it in a type statment:

type userName = typeof userName; //it is now a typescript type operation, and it will give you the type of the variable userName, which is string.
//it will be erased at runtime and will not be present in the final JavaScript code.


const settings = {
    difficulty:"easy",
    minLevel:10,
    didStart:false,
    players:['John',"Jane"]
}

type Settings = typeof settings;

function loadData (settings:Settings){
//.....
}



function sum(a: number, b: number) {
  return a + b;
}
function subtract(a: number, b: number) {
  return a - b;
}

type SumFn = typeof sum;
type SubtractFn = typeof subtract;

function performMathAction(cb: SumFn | SubtractFn) {
  // some code...
}