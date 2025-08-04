"use strict";
/*
// 위 문구가 맨 처음 작성되면 strict mode 가 활성화
// 각 script 마다 strict mode를 두고 쓰는걸 beginner 에게 추천함
// 1. 특정 작업 금지함
// 2. 에러를 명시적으로 보여줌

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive :D");

// strict mode 활성화 시,
// → script.js:10 Uncaught ReferenceError: hasDriverLicense is not defined

// const interface = "Audio";
// const private = 534;
// const if = 23;
// → Uncaught SyntaxError: Unexpected strict mode reserved word


// functions
function logger() {
  console.log("My name is Seoyeon");
}

// calling / running / invoking function
logger();
logger();
logger();

// function as machine - food processor
function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number("23");
*/

// function declarations
const age1 = calcAge1(1991);

function calcAge1(birthYear) {
  // const age =
  // return age;
  return 2037 - birthYear;
}

// function expression

// function declaration 과 달리 function expression은 함수 선언 전 호출이 불가능하다.
// const age2 = calcAge2(1991);
// → Uncaught ReferenceError: Cannot access 'calcAge2' before initialization

// 함수 이름을 부여하지 않음 → anonymous function
// 아래 function은 사실 "식"이다. 식은 "value"를 생성한다.
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);
console.log(age1, age2);

// 어떤 타입의 function 을 사용하는지는 개발자 개인의 퓌향 문제이다.
// Jonas 는 expression을 선호하지만, 대부분은 expression을 선호.
// 물론 두 가지 다 구별하고 사용하는 방법을 익혀야 한다.
