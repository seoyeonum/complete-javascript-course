'use strict';

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// const italianFoods = new Set([
//   'pasta',
//   'gnocchi',
//   'tomatoes',
//   'olive oil',
//   'garlic',
//   'basil',
// ]);

// const mexicanFoods = new Set([
//   'tortillas',
//   'beans',
//   'rice',
//   'tomatoes',
//   'avocado',
//   'garlic',
// ]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },
};

const arr = [2, 3, 4];
const b = arr[0];
const c = arr[1];
const d = arr[2];

const [x, y, z] = arr; //  [대괄호]가 왼쪽에 위치, 배열 회피 (Destructr Arrays)
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories; // 중간 비워둔 만큼 건너뛰기 (Destructr Arrays)
console.log(main, secondary); // → Italian Vegetarian

// Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main]; // 배열 위치 (동시에) 교체
console.log(main, secondary); // → Vegetarian Italian

// Recieve 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0); // → (2) ['Garlic Bread', 'Pizza']
console.log(starter, mainCourse); // → Garlic Bread Pizza

// ※ Nested destructuring
const nested = [2, 4, [5, 6]]; // nested array (중첩 배열)
// const [i, , j] = nested;
// console.log(i, j); // 2 [5, 6]

// 만약 중첩 배열도 분리하기를 원한다면?
const [i, , [j, k]] = nested;
console.log(i, j, k);

// ※ Default values
// const [p, q , r] = [8, 9];
// console.log(p, q, r); // 8 9 undefined
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 8 9 1
