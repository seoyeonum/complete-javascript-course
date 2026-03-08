'use strict';
// ※ Writing clean and modern JavaScript

// 1. Readable code
// - Write code so that "others" can understand it
// - Write code so that "you" can understand it in 1 year
// - Avoid too "clever" and overcomplicated solutions
// - Use descriptive variable names: "what they contain"
// - Use descriptive function names: "what they do"

// 2. General
// - Use DRY principle (refactor your code)
// - Don't pollute global namespce, encapsulate instead
// - Don't use var
// - Use strong type checks (=== and !==)

// 3. Functions
// - Generally, functions should do "only one thing"
// - Don't use more than 3 function parameters
// - Use default parameters whenever possible
// - Generally, return same data type as received
// - Use arrow function when they make code more readable

// 4. OOP
// - Use ES6 classes
// - Encapsulate data and "don't mutate" it from outside the classes
// - Implement method chaining
// - Do "not" use arrow functions as methods (in regular objects)

// 5. Avoid nested code
// - Use early return (guard clauses)
// - Use ternary (conditional) or logical operator instead of if
// - Use multiple if instead of if/else-if
// - Avoid for loops, use array methods instead
// - Avoid callback-based asynchronous APIs

// 6. Asynchronous code
// - Consume promises with asynch/await for best readability
// - Whenever posiible, run promises in parallel(Promise.all)
// - Handle errors and promise rejections

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// (Object.freez는 소위 deep freeze는 아니라 내부 상태 변경이 가능하긴 하다!)
// budget[0].value = 1000; // (변경 가능)
// budget[9] = 'jonas'; // (변경 불가능)

// Object.freeze를 활용하여 mutate 처리
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200; // (변경 불가능)

// using optional chaining & nullish coalescing operator (ES2020)
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function :)
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas',
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda',
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// const checkExpenses2 = function (state, limits) {
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };

// ↓ arrow fn

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry,
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce((str, cur) => `${str} / ${cur.description}`, '');

  console.log(bigExpenses);
  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // // Emojis are 2 chars
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 500);

/////////////////////////////////////////////
// ※ Declarative and Functional JavaScript Principles
/*

// 1. Two fundamentally different ways of writing code (paradigms)
// 1) IMPERATIVE
// - Programmer explains "HOW to do things"
// - We explain the computer every single step it has to follow to achieve a result
// - e.g. Step-by-step recipe of a cake
const arr1 = [2, 4, 6, 7];
const doubled1 = [];
for (let i = 0; i < arr1.length; i++) doubled1[i] = arr1[i] * 2;

// 2) DECLARATIVE
// - Programmers tells "WHAT to do"
// - We simply describe the way the computer should achieve the result
// - The HOW(step-by-step instructions) gets abstracted away
// - e.g. Desctiption of a cake
const arr2 = [2, 4, 6, 8];
const doubled2 = arr2.map(n => n * 2);

// 2. Functional programming
// - Declarative proframming paradigm
// - Based on the idea of writing software by combining many pure functions,
// avoiding side effects and mutating data

// - Side effect
// : Modification (mutation) of any data outside of the function
// (mutating external variables, logging to console, writing to DOM, etc.)

// - Pure function
// : Function without side effects. Does not depend on external variables.
// Given the same inputs, always returns the same outputs.

// - Immutability
// : State (data) is never modified!
// Instead, state is copied and the copy is mutated and returned.

// - e.g. REACT, REDUX

// 3. Functional programming techniques
// - Try to avoid data mutations
// - Use built-in methods that don't produce side effects
// - Do data transformations with methods such as .map(), filter(), and .reduce()
// - Try to avoid side effects in functions: this is of course not always possible!

// 4. Declarative syntax
// - Use array and object destructuring
// - Use the spread operator(...)
// - Use the ternary (conditional) operator
// - Use template literals
*/
