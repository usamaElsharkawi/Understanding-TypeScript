"use strict";
function add2(a, b) {
    return a + b;
}
function log(message) {
    console.log(message);
}
function throwError(message) {
    throw new Error(message);
}
console.log(log("Hello World!"));
console.log(throwError("This is an error message!"));
