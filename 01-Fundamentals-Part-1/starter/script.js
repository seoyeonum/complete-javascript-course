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

// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = "Jonas";
const lastName = "Schmedtmann";
console.log(firstName + " " + lastName);

// Assignment operators
let x = 10 + 5; // → 15
x += 10; // x = x + 10 → 25
x *= 4; // x = x * 4 → 100
x++; // x = x + 1 → 101
x--; // x = x - 1 → 100
console.log(x);

// Comparison operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18); // → true / false

const isfullAge = ageSarah >= 18;
console.log(now - 1991 > now - 2018); // JS calculate math first


const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);


const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

const jonas =
  "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";
console.log(jonas);

// template literals 의 활용 → backtick(`)
const jonasNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(jonasNew);

console.log(`Just a regular string...`);

// multiLine(다중 문자열) 필요 시 template literals 활용하면 유용!
// JavaScript에서는 개행문자에 백슬래시(\)가 하나 더 필요 → (\n\)
// (단, 아래의 경우 \n\ 없이도 작동 가능! 오히려 \n\ 넣는 게 버그로 인한 결과)
console.log(`String with \n\
multiple \n\
lines`);

console.log(`String
multiple
lines`);


// control structure → if / else statements

const age = 15;

if (age >= 18) {
  console.log("Sarah can start driving license 🚗");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;

let century;
if (birthYear <= 2000) {
  // let century = 20;
  century = 20;
} else {
  // let century = 21;
  century = 21;
}
// console.log(century);    //→ Uncaught ReferenceError: century is not defined
console.log(century);


// type conversion
const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number("Jonas")); // → NaN
console.log(typeof NaN); // → number

console.log(String(23), 23); // → 23

// type coercion
console.log("I am " + 23 + " years old"); // → 문자열로 반환
console.log("I am " + "23" + " years old"); // → 문자열로 반환

console.log("23" - "10" - 3); // → 3 (숫자로 반환)
console.log("23" + "10" + 3); // → 23103 (문자열 반환)
console.log("23" * "2"); // → 46 (숫자로 반환)
console.log("23" / "2"); // → 11.5 (숫자로 반환)

let n = "1" + 1;
n = n - 1;
console.log(n);


// 5 falsy values (in JS) : 0, '', undefined, null, NaN
// → boolean 으로 변환(coercion) 시 falsy

console.log(Boolean(0)); // → false
console.log(Boolean(undefined)); // → false
console.log(Boolean("Jonas")); // → true
console.log(Boolean({})); // → true
console.log(Boolean("")); // → false

const money = 100;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log("You should get a job!");
}

let height = 0;
if (height) {
  console.log("YAY! Height is defined");
} else {
  console.log("Height is UNDEFINED");
}


// === → 정확히 같은 값인지 확인(엄격한 등호 연산자/삼중 등호 연산자)
// == → coercion을 적용하여 같은 값인지 확인(루즈한 등호 연산자)
// 가급적이면 엄격한 등호 연산자를 사용한다. → 에러 대응을 위해!
// if 문의 실행문이 한 줄 뿐이라면 {중괄호}는 생략해도 된다.
const age = "18";
if (age === 18) console.log("You just became an adult :D (strict)");

if (age == 18) console.log("You just became an adult :D (loose)");

const favorite = Number(prompt("What's your favoraite number?"));
console.log(favorite);
console.log(typeof favorite); // → string

if (favorite === 23) {
  // 23 === 23
  console.log("Cool! 23 is an amazing number!");
} else if (favorite === 7) {
  console.log("7 is also a cool number");
} else if (favorite === 9) {
  console.log("9 is also a cool number");
} else {
  console.log("Number is not 23 or 7");
}

if (favorite !== 23) console.log("Why not 23?");
*/

// logical operators → AND. OR, NOT
const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// const shouldDrive = hasDriversLicense && hasGoodVision;

// if (hasDriversLicense && hasGoodVision) {
//   console.log("Sarah is able to drive!");
// } else {
//   console.log("Someone else should drive...");
// }

const isTired = false; // C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive...");
}
