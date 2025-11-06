'use strict';

/*
// Global scope
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    // Block scope
    if (birthYear >= 1981 && birthYear <= 1996) {
      var milenial = true; // var type variable follows Function scoped
      // Creating NEW variable with same name as outer scopes; variable
      const firstName = 'Steven';

      // Reassigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a milenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(milenial);
    // console.log(add(2, 3)); // strict mode 를 해제할 경우, add 호출 가능!
    console.log(output);
  }
  printAge();
  return age;
}

const firstName = 'Seoyeon';
calcAge(1991);
// console.log(age);
// printAge();


// ※ Hoisting and TDZ in Practice
// Hoisting: Makes some types of variables accessible in the code before they are actually declared.
// "Variables lifted to the top of their scope".
// (Behind the scenes)
// → Before execution, code is scanned for variable declarations,
// and for each variable, a new property is created in the variable environment object.

// 1. function declarations
// : hoisted(✅), initial value(Actual function), scope(Block)

// 2. var variables
// : hoisted(✅), initial value(undefined), scope(Function)

// 3. let and const variables
// : hoisted(🚫), initial value(<uninitialized>, TDZ), scope(Block)

// 4. function expressions and arrows
// : Depends if using var or let/const

// Variables
console.log(me); // → undefined
// console.log(job); // → Uncaught ReferenceError: Cannot access 'job' before initialization
// console.log(year); // → Uncaught ReferenceError: Cannot access 'year' before initialization

var me = 'Seoyeon';
let job = 'student';
const year = 1991;
// ※ 47 ~ 48 = Temporal Dead Zone

// Function
console.log(addDecl(2, 3)); // → 5
// console.log(addExpr(2, 3)); // → Uncaught ReferenceError: Cannot access 'addExpr' before initialization
console.log(addArrow); // → undefined
// console.log(addArrow(2, 3)); // → Uncaught TypeError: addArrow is not a function

function addDecl(a, b) {
  return a + b;
}
const addExpr = function (a, b) {
  return a + b;
};
var addArrow = (a, b) => a + b;
// ※ 57 ~ 58 = Temporal Dead Zone

// Example
console.log(numProducts); // → undefined
if (!numProducts) deleteShoppingCart(); // → All products deleted!
// numProducts 가 0이 아님에도 hoisting 으로 인해 if 블럭 내 함수가 실행

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// ※ 위와 같은 상황을 피하기 위해서는...
// - 변수 선언 시 const 위주로 사용
// - 가장 위쪽에 변수를 선언
// - 모든 함수는 먼저 선언한 후 이후에만 사용

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false
*/

// ※ How the this keyword works
// this keyword/variable
// : Special variable that is created for every execution context (every function)
// Takes the value of (points to) the "owner" of the function in which the this keyword is used

// 1. Method
// this = <Object that is calling the method>

// 2. Simple function call
// this = undefined

// 3. Arrow functions
// this = <this of surrounding function (lexical this)>

// 4. Event listener
// this = <DOM element that the handler is attacheed to>

// ※ this is NOT static
// It depends on how the function is called,
// and its value is only assigned when the function is actually called.

// ※ this does NOT point to the function itself,
// and also NOT the its variable environment
