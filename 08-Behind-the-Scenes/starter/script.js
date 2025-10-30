'use strict';

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
