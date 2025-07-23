/*
let js = "amazing";
// console.log(40 + 8 + 23 - 10);

console.log("Seoyeon");
console.log(23);

let firstName = "Matilda";

console.log(firstName);
console.log(firstName);
console.log(firstName);

// Variable name convention

// variable names cannot start with numbers
// let 3years = 3;    // Uncaught SyntaxError: Invalid or unexpected token

// variable names cannot contain '&'
// let seoyeon&matilda = 'JM';    // Uncaught SyntaxError: Unexpected token '&'
let seoyeon_matilda = "JM";

// 'new', 'function', ... are reserved keyword
// let new = 27;    // Uncaught SyntaxError: Unexpected token 'new'
// let function = 27;    // Uncaught SyntaxError: Unexpected token 'function'
let sfunction = 27;

// name 키워드의 경우 사용 가능하지만 권장하지 않음
// → firstName 의 식으로 사용하기를 권장함
// name = 'Seoyeon';

// not illegal but do not recommend using variable names start with upper character
// let Person = 'seoyeon';
let person = "seoyeon";

// For numbers that will never change, capitalize the variable name
let PI = 3.1415;

let myFirstJob = "Coder";
let myCurrentJob = "Teacher";

let job1 = "programmer";
let job2 = "teacher";

console.log(myFirstJob);


let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof "James");

javascriptIsFun = "YES!";
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);
*/

// 변수 종류 - let, const and var
// ① let
let age = 30;
age = 31;

// ② const
// const 로 만든 변수 → 값의 재배치 불가능
const birthYear = 1991;
// birthYear = 1990; // Uncaught TypeError: Assignment to constant variable.

// const 로 만든 변수 → 초기화 필요
// const job;    // Uncaught SyntaxError: Missing initializer in const declaration

// 변수가 바뀌어야 할 때만 let 사용하고,
// 그렇지 않다면 const 사용해 클린 코드 유지하기 (관행)

// ③ var
// var 로 만든 변수 → 추천하지 않지만 알아는 두자.
var job = "programmer";
job = "teacher";

// 변수를 선언하지 않아도 변수가 작동하지만(global) 가급적 지양하자.
lastName = "Schmedtmann";
console.log(lastName);
