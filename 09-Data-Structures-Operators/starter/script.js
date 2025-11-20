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

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order receiced! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
      // → Order receiced! undefined and Risotto will be delivered to Via del Sole, 21 at 22:30
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...orhterIngredients) {
    console.log(mainIngredient);
    console.log(orhterIngredients);
  },
};

// ※ Logical Assignment Operator (ES2021부터 도입)
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// ※ Looping Arrays: The for-of Loof
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);
// →
// Focaccia
// Bruschetta
// Garlic Bread
// Caprese Salad
// Pizza
// Pasta
// Risotto

// array.entries() 하면 숫자와 함께 담긴 배열이 출력
for (const item of menu.entries()) {
  // console.log(item);
  // →
  // [1, 'Bruschetta']
  // [2, 'Garlic Bread']
  // [3, 'Caprese Salad']
  // [4, 'Pizza']
  // [5, 'Pasta']
  // [6, 'Risotto']
  // 위 코드와 같은 결과를 가져오는 하단의 코드
  // console.log(`${item[0] + 1}: ${item[1]}`);
  // →
  // 1: Focaccia
  // 2: Bruschetta
  // 3: Garlic Bread
  // 4: Caprese Salad
  // 5: Pizza
  // 6: Pasta
  // 7: Risotto
}

console.log(...menu.entries()); // → Array Iterator {}
// →
// [0, 'Focaccia']
// [1, 'Bruschetta']
// [2, 'Garlic Bread']
// [3, 'Caprese Salad']
// [4, 'Pizza']
// [5, 'Pasta']
// [6, 'Risotto']

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
  // →
  // 1: Focaccia
  // 2: Bruschetta
  // 3: Garlic Bread
  // 4: Caprese Salad
  // 5: Pizza
  // 6: Pasta
  // 7: Risotto
}

/*
// ※ OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
// console.log(rest1); // → {name: 'Capri', numGuests: 20}
// console.log(rest2); // → {name: 'La Piazza', owner: 'Giovanni Rossi', numGuests: 10}
// 딱 한 가지 상황을 제외하고는 위 연산자가 효과적이다.
// (0을 가지고 있어 falsy value로 간주되는 상황)

// ※ Nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
console.log(rest1); // → {name: 'Capri', numGuests: 0}
console.log(rest2); // → {name: 'La Piazza', owner: 'Giovanni Rossi', numGuests: 10}
// 0을 가지고 있더라도 0이 제대로 출력된다.

// ※ AND assinment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1); // → {name: 'Capri', numGuests: 0}
console.log(rest2); // → {name: 'La Piazza', owner: '<ANONYMOUS>', numGuests: 10}
*/

/*
// ※ The Nullish Coalescing Operator (Null 병합 연산자; ES2020부터 도입)
// : short-circuiting 에 있어 0이 출력되도록 해보자!
restaurant.numGuests = 0;

const guests = restaurant.numGuests || 10;
console.log(guests); // → 10

// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); // → 0
*/

/*
// ※ Short Circuiting (&& and ||)

console.log('----- OR -----');
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Jonas'); // → 3
console.log('' || 'Jonas'); // → Jonas
console.log(true || 0); // → true
console.log(undefined || null); // → null (null 도 falsy value지만 이렇게 나온다.)

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // → Hello

restaurant.numGuests = 23; // 이게 0이라면 short-circuiting 에 문제가 생긴다...!?!?
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // → 10

const guests2 = restaurant.numGuests || 10;
console.log(guests2); // → 10

console.log('----- AND -----');
console.log(0 && 'Jonas'); // → 0 (첫 값이 falsy value 라면 그 값을 출력)
console.log(7 && 'Jonas'); // → Jonas

console.log('Hello' && 23 && null && 'jonas'); // → null

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// 모든 if statement 를 short-circuiting 으로 만들라는 뜻이 아니다!
// 오히려 가독성이 떨어지는 상황이 발생할 수 있음!
*/

/*
// ※ rest pattern and parameters

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, becuse on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);
// → 1 2 [3, 4, 5]

// Uncaught SyntaxError: Rest element must be last element
// const [pizza, , risotto, ...otherFood, bread] = [
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
// → Pizza Risotto ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
// → {fri: {open: 11, close: 23} thu:{open: 12, close: 22}}

// 2) Functions
// parameter 의 개수를 정하지 않고 받을 때 rest syntax를 활용
// (spread 연산자와 rest syntax는 정반대의 기능을 한다.)
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3); // → 5
add(5, 3, 7, 2); // → 17
add(8, 2, 5, 3, 2, 1, 4); // → 25

const x = [23, 5, 7];
// x 배열을 spread operator 를 활용하여 unpack 후 parameter 로 넘겨주기
add(...x); // → 35

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// → mushrooms
// → ['onion', 'olives', 'spinach']

restaurant.orderPizza('mushrooms');
// → mushrooms
// → []
*/

/*
// ※ The Spread Operator (...)
// Bad example
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); // → [1, 2, 7, 8, 9]

// Good example
const newArr = [1, 2, ...arr];
console.log(newArr); // → [1, 2, 7, 8, 9]

// spread 연산자는 배열 내 구성 요소를 꺼내기에도 용이함
console.log(...newArr); // → 1 2 7 8 9
console.log(1, 2, 7, 8, 9); // → 1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu); // → ['Pizza', 'Pasta', 'Risotto', 'Gnocci']

// Spread 연산자는 destructuring arrays 와 유사한 기능을 한다.
// 단, 모든 배열 요소를 가져오고, 변수를 추가로 생성하지 않는다는 차이가 있다.

// Copy array
const mainMenuCopy = [...restaurant.mainMenu]; // (Shallow copy 상태)

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);
// → ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', 'Pizza', 'Pasta', 'Risotto']

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); // → ['J', 'o', 'n', 'a', 's', ' ', 'S.']
console.log(...str); // → J o n a s
console.log('j', 'o'); // → j o

// template literal 안에 spread operator 사용 불가
// console.log(`${...str} Schmedtmann`)
// → Uncaught SyntaxError: Unexpected token '...'

// Real-world example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"), // ← shirimp
  // prompt('Ingredient 2'), // ← bacon
  // prompt('Ingredient 3'), // ← cheese
];
// prompt: 사용자로부터 데이터를 입력받을 수 있는 경고창
// confirm: 사용자로부터 확인 의사를 받을 수 있는 경고창
// alert: 사용자에게 데이터를 출력하는 경고창
console.log(ingredients); // → ['shirimp', 'bacon', 'cheese']

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]); // → Here is your delicious pasta with shirimp, bacon and cheese
restaurant.orderPasta(...ingredients); // → Here is your delicious pasta with shirimp, bacon and cheese
// 배열의 길이를 알 수 없는 상황에서 ...를 활용하는 게 더 바람직!

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // → Ristorante Roma
console.log(restaurant.name); // → Classico Italiano
*/

/*
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  startIndex: 2,
});
// {time: '22:30', address: 'Via del Sole, 21', mainIndex: 2, startIndex: 2}

// default 지정하기
restaurant.orderDelivery({ address: 'Via del Sole, 21', starterIndex: 1 });
// → Order receiced! Bruschetta and Pizza will be delivered to Via del Sole, 21 at 20:00

// ※ Destructuring Objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
// → Classico Italiano
// → fri
// :
// {open: 11, close: 23}
// sat
// :
// {open: 0, close: 24}
// thu
// :
// {open: 12, close: 22}
// → ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

// (Destructuring Objects 시) 다른 변수명을 부여(:)해주는 것도 가능
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values (정의되지 않은 변수는 기본값 정의)
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// { a, b } = obj; // → Uncaught SyntaxError: Unexpected token '='
({ a, b } = obj);
console.log(a, b); // → 23 7

// ※ Nested Objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c); // → {open: 11, close: 23} → 11 23
*/

/*
// ※ Destructuring Arays
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
*/
