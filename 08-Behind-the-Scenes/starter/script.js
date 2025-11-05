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
*/

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
