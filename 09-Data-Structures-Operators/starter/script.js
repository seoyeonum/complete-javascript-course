'use strict';
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ※ enhanced object literals (ES6 도입)
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order receiced! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
      // → Order receiced! undefined and Risotto will be delivered to Via del Sole, 21 at 22:30
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...orhterIngredients) {
    console.log(mainIngredient);
    console.log(orhterIngredients);
  },
};

// ※ Working with String - Part 3

// 1.Split and Join
console.log('a+very+nice+string'.split('+'));
// → ['a', 'very', 'nice', 'string']
console.log('Seoyeon Um'.split(' ')); // 공백도 괄호 안에 작성 필수!
// → ['Seoyeon', 'Um']

// destructuring 과 결합해보자
const [firstName, lastName] = 'Seoyeon Um'.split(' ');

// split과 반대 메서드인 join
const newName = ['Ms.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // → Ms. Seoyeon UM

// real examples
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis'); // → Jessica Ann Smith Davis
capitalizeName('jonas schmedtmann'); // → Jonas Schmedtmann

// 2. Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+'));
// → +++++++++++Go to gate 23!
console.log(message.padStart(25, '+').padEnd(35, '+'));
// → +++++++++++Go to gate 23!++++++++++

console.log('Jonas'.padStart(25, '+'));
// → ++++++++++++++++++++Jonas
console.log('Jonas'.padStart(25, '+').padEnd(35, '+'));
// → ++++++++++++++++++++Jonas++++++++++

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(12345678));
// → ****5678
console.log(maskCreditCard(4332987264797632));
// → ************7632
console.log(maskCreditCard('907205348587938223479'));
// → *****************3479

// 3. Repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} plane in line ${'✈'.repeat(n)}`);
};

planesInLine(5); // → There are 5 plane in line ✈✈✈✈✈
planesInLine(12); // → There are 12 plane in line ✈✈✈✈✈✈✈✈✈✈✈✈
console.log();
/*
// ※ Working with String - Part 2
const airline = 'TAP Air Korea';

console.log(airline.toLowerCase()); // → tap air korea
console.log(airline.toUpperCase()); // → TAP AIR KOREA

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // → Jonas

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim(); // 공백제거(개행문자도 제거)
// console.log(trimmedEmail); // → hello@jonas.io

// 아래와 같이 chaining 해도 좋다.
const normalizedEmail = loginEmail.toLocaleLowerCase().trim();
console.log(normalizedEmail); // → hello@jonas.io
console.log(email === normalizedEmail); // → true

// replacing
const priceGB = '288,97￡';
const priceUS = priceGB.replace('￡', '$').replace(',', '.');
console.log(priceUS); // → 288.97$

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
// → All passengers come to boarding gate 23. Boarding door 23!
// 문자열의 첫 번째 항목만 교체하는 모습!
console.log(announcement.replaceAll('door', 'gate'));
// → All passengers come to boarding gate 23. Boarding gate 23!

// 위 방법 외에도 정규식을 사용하는 방법이 있다.
// 아래 정규식은 대소문자를 구분한다. /교체 대상 문자열/g(글로벌)
console.log(announcement.replace(/door/g, 'gate'));
// → All passengers come to boarding gate 23. Boarding gate 23!

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('Airbus')); // → true
console.log(plane.includes('Boeing')); // → false
console.log(plane.startsWith('Air')); // → true
console.log(plane.startsWith('A320')); // → false

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family'); // → Part of the NEW Airbus family
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some food and a pocket Knife'); // → You are NOT allowed on board
checkBaggage('Socks and camera'); // → Welcome aboard!
checkBaggage('Got some snacks and a gun for protection'); // → You are NOT allowed on board
*/

/*
// ※ Working with String - Part 1
const airline = 'TAP Air Korea';
const plane = 'A320';

// 문자열의 특정 문자 조회: index 0부터 시작
console.log(plane[0]); // → A
console.log(plane[1]); // → 3
console.log(plane[2]); // → 2
console.log('B737'[0]); // → B

// 문자열의 길이 (공백 포함)
console.log(airline.length); // → 13
console.log('B737'.length); // → 4

// 문자열 내 문자 위치(인덱스) 조회
console.log(airline.indexOf('r')); // → 6
console.log(airline.lastIndexOf('r')); // → 10
console.log(airline.indexOf('Korea')); // → 8
console.log(airline.indexOf('korea')); // → -1 (찾을 수 없음)

// 문자열 슬라이싱(시작인덱스, 끝인덱스(포함X))
// : 끝 인덱스 생략 시 끝까지 포함
console.log(airline.slice(4)); // → Air Korea
console.log(airline.slice(4, 7)); // → Air

// 인덱스 넘버로 하드코딩하지 않고 해결해보자.
console.log(airline.slice(0, airline.indexOf(' '))); // → TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // → Korea

console.log(airline.slice(-2)); // → ea
console.log(airline.slice(1, -1)); // → AP Air Kore

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😂');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B'); // → You got the middle seat 😂
checkMiddleSeat('23C'); // → You got lucky 😎
checkMiddleSeat('3E'); // → You got the middle seat 😂

console.log(new String('jonas')); // → String {'jonas'}
console.log(typeof new String('jonas')); // → object

console.log(typeof new String('jonas').slice(1)); // → string
*/

/*
// ※ Maps: Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);
// → Map(7) {
// 'question' => 'What is the best programming language in the world?',
// 1 => 'C',
// 2 => 'Java',
// 3 => 'JavaScript',
// 'correct' => 3,
// true => "Correct 🎉",
// false => "Try again!"
// }

// Convert object to map
console.log(Object.entries(openingHours));
// → [
// ['thu', {open: 12, close: 22}],
// ['fri', {open: 11, close: 23}],
// ['sat', {open: 0, close: 24}]
// ]
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
// → Map(3) {
// {'thu' => {open: 12, close: 22}},
// {'fri' => {open: 11, close: 23}},
// {'sat' => {open: 0, close: 24}}
// }

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);
// →
// What is the best programming language in the world?
// Answer 1: C
// Answer 2: Java
// Answer 3: JavaScript

console.log(question.get(question.get('correct') === answer));
// (정답 숫자 3 입력 시) → Correct 🎉
// (오답 입력 시) → Try again!

// ※ Convert map to array
// : 만약, Map을 다시 Array와 같은 Structure로 변환해야 한다면
// Spread 연산자를 결합하여 사용!
console.log([...question]);
// →
// [
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]
// console.log(question.entries()); // [...question]과 같다.
console.log([...question.keys()]);
// → ['question', 1, 2, 3, 'correct', true, false]
console.log([...question.values()]);
// → ['What is the best programming language in the world?', 'C', 'Java', 'JavaScript', 3, 'Correct 🎉', 'Try again!']
*/

/*
// ※ Maps: Fundamentals
// Map이 Set 보다 유용하게 쓰인다!
// Object 에서 key는 항상 String 이지만,
// key는 어떤 유형이든 가질 수 있으며 심지어 Map일 수도 있다.

const rest = new Map();

// 1. Map.set() : chain 만들기
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));
// → Map(3) {
// 'name' => 'Classico Italiano',
//  1 => 'Firenze, Italy',
//  2 => 'Lisbon, Portugal'}

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

// 2. Map.get() : key로 value 가져오기
console.log(rest.get('name')); // → Classico Italiano
console.log(rest.get(true)); // → We are open :D
console.log(rest.get('true')); // → undefined
console.log(rest.get(1)); // → Firenze, Italy

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// (time = 21일 때) → We are open :D
// (time = 6일 때) → We are closed :(

// ※ true, false를 key로 사용했을 때의 장점을 보여주고 있으나,
// 코드의 가독성이 매우 떨어지고 있으니 위와 같은 상황은 피할 것!
// (장점만 수용할 것!)

// 3. Map.has() : key 존재 유무 확인
console.log(rest.has('categories')); // → true

// 4. Map.delete() : key 기반으로 map 구성 요소 삭제
rest.delete(2);
console.log(rest);
// → Map(7) {
// 'name' => 'Classico Italiano',
//  1 => 'Firenze, Italy',
//  'categories' => Array(4),
//  'open' => 11,
//  'close' => 23,
//  true => "We are open :D",
//  false => "We are closed :("}

// 5. Map.size
console.log(rest.size); // → 7

// 6. Map.clear()
// rest.clear();
// console.log(rest); // → Map(0) {size: 0}

// ※ Set 과 Map 모두 ES6 때 도입되어 겹치는 Method 가 많다!

// ※ 배열을 key로 두었을 때
const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading'); // key 값에 무엇이든 넣을 수 있어 가능한 코드
console.log(rest);
console.log(rest.get(arr)); // → Test
// arr 변수를 선언한 이유는, .set()에서의 key 값과 .get()에서의 key 값이 가리키는 주소가 같아야 하기 때문!
// arr 변수 사용 없이 직접 [1,2]를 사용하면 서로 다른 주소값을 가리키게 되어 undefined 가 출력된다.
*/

/*
// ※ New Operations To Make Sets Useful
// ES2025 이후 추가된 7가지 메서드가 Set을 더욱 유용하게 만들었고,
// JavaScript를 다른 프로그래밍 언어 수준으로 끌어올렸다.

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// 1. Intersection Method (교차 메서드)
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log('Intersction:', commonFoods); // → Intersction: Set(2) {'tomatoes', 'garlic'}
console.log([...commonFoods]); // → ['tomatoes', 'garlic']
// Tip: Set보다는 Array 형태로 작업하는 것이 더 유용하다.

// 2. Union Method (중복 허용 없이 병합)
const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log('Union:', italianMexicanFusion);
// → Union: Set(10) {'pasta', 'gnocchi', 'tomatoes', 'olive oil', 'garlic', 'basil', 'tortillas', 'beans', 'rice', 'avocado'}

console.log([...italianFoods, ...mexicanFoods]);
// → (12) ['pasta', 'gnocchi', 'tomatoes', 'olive oil', 'garlic', 'basil', 'tortillas', 'beans', 'rice', 'tomatoes', 'avocado', 'garlic']

console.log(new Set([...italianFoods, ...mexicanFoods]));
// → Set(10) {'pasta', 'gnocchi', 'tomatoes', 'olive oil', 'garlic', 'basil', 'tortillas', 'beans', 'rice', 'avocado'}

console.log([...new Set([...italianFoods, ...mexicanFoods])]);
// → (10) ['pasta', 'gnocchi', 'tomatoes', 'olive oil', 'garlic', 'basil', 'tortillas', 'beans', 'rice', 'avocado']

// 3. Difference Method (첫 번째에는 있지만 두 번째에는 없는; 첫 번째 고유의 요소)
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
console.log('Difference italian:', uniqueItalianFoods);
// → Difference italian: Set(4) {'pasta', 'gnocchi', 'olive oil', 'basil'}

const uniqueMecianFoods = mexicanFoods.difference(italianFoods);
console.log('Difference mexican:', uniqueMecianFoods);
// → Difference mexican: Set(4) {'tortillas', 'beans', 'rice', 'avocado'}

// 4. Symmetric Method (Intersection Method 의 정반대)
const uniqueItalianAndMexcianFoods =
  italianFoods.symmetricDifference(mexicanFoods);
console.log(uniqueItalianAndMexcianFoods);
// → Set(8) {'pasta', 'gnocchi', 'olive oil', 'basil', 'tortillas', …}

// 추가로 3가지 방법이 있음 (isSupersetOf, isSubsetOf, isDisjointFrom)
// 5. 앞의 배열이 뒤의 배열로부터 분리되어 있는가?
console.log(italianFoods.isDisjointFrom(mexicanFoods)); // → false
*/

/*
// ※ Sets
// - ES6가 나오기 전까지 JavaScript는 Array 만을 자료 구조로 가지고 있었으나,
// ES6 이후 Set과 Map 이 추가되었다.
// - 다른 언어에서와 마찬가지로 Set은 중복된 내용이나 순서가 없다.
// - Array와 마찬가지로 Set 도 Iterable이다.

// Create Set
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet); // → Set(3) {'Pasta', 'Pizza', 'Risotto'}

console.log(new Set('Jonas')); // → Set(5) {'J', 'o', 'n', 'a', 's'}

// size of Set
console.log(ordersSet.size); // → 3

// Check elements
console.log(ordersSet.has('Pizza')); // → true
console.log(ordersSet.has('Bread')); // → false

// Add elements
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet); // → Set(4) {'Pasta', 'Pizza', 'Risotto', 'Garlic Bread'}

// Delete elements
ordersSet.delete('Risotto');
console.log(ordersSet); // → Set(3) {'Pasta', 'Pizza', 'Garlic Bread'}
console.log(ordersSet[0]); // → undefined
// Set에는 순서가 없기 때문에 Index가 존재하지 않는다.
// 순서가 필요하다면 Array를 활용하는 게 더 적합하다.

// ordersSet.clear(); // 모든 element 삭제
// console.log(ordersSet); // → Set(0) {size: 0}

// Looping
// : Set 역시 Iterable 이므로 looping 이 가능하다.
for (const order of ordersSet) console.log(order);
// →
// Pasta
// Pizza
// Garlic Bread

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)]; // Spread 연산자와 결합해 Array 형태로 만들기
console.log(staffUnique); // → ['Waiter', 'Chef', 'Manager']
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
); //→ 3

console.log(new Set('jonasschmedtmadnn')); // → Set(11) {'j', 'o', 'n', 'a', 's', …}
*/

/*
// ※ Looping Objects: Object Keys, Values, and Entries

// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties); // → ['thu', 'fri', 'sat']

let openStr = `We are open on ${properties.length} days: `;
// We are open on 3 days:

for (const day of properties) {
  openStr += `${day},`;
}
console.log(openStr); // → We are open on 3 days: thu,fri,sat,

// Property VALUES
const values = Object.values(openingHours);
console.log(values);
// →
// [
//  {open: 12, close: 22},
//  {open: 11, close: 23},
//  {open: 0, close: 24}
// ]

// Entry object
const entries = Object.entries(openingHours);
console.log(entries);
// →
// [
//  ['thu', {open: 12, close: 22}],
//  ['fri', {open: 11, close: 23}],
//  ['sat', {open: 0, close: 24}]
// ]

// for (const x of entries) {
// console.log(x);
// →
// ['thu', {open: 12, close: 22}]
// ['fri', {open: 11, close: 23}]
// ['sat', {open: 0, close: 24}]
// }

// [key, value]
// + Object destructuring 을 활용해서 한 번에 출력
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
  // →
  // On thu we open at 12 and close at 22
  // On fri we open at 11 and close at 23
  // On sat we open at 0 and close at 24
}
*/

/*
// ※ Optioanl Chaining (?. / ES2020 도입)
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open); // 실행되지 않음.

// console.log(restaurant.openingHours.mon.open);
// → Uncaught TypeError: Cannot read properties of undefined (reading 'open')

// ※ WITH optional chaining
// : ?. 좌측 값이 존재하면 출력,아니면 undefined
// 좌측 값이 0이거나 빈 문자열도 exist 하는 것으로 간주
console.log(restaurant.openingHours.mon?.open); // → undefined
console.log(restaurant.openingHours?.mon?.open); // → undefined
// 즉, ?.를 추가하는 것 만으로도 Error 가 발생하는 것을 막을 수 있다!

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // console.log(day);
  // optional chaining 과 nullish coalescing operator 활용
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
  // →
  // On mon, we open at closed
  // On tue, we open at closed
  // On wed, we open at closed
  // On thu, we open at 12
  // On fri, we open at 11
  // On sat, we open at 0
  // On sun, we open at closed
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); // → ['Focaccia', 'Pasta']
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist'); // → Method does not exist

// Arrays
// const users = [];
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'User array empty'); // → 'Jonas'

if (users.length > 0) console.log(users[0].name);
else console.log('user array empty'); // → 'Jonas'
*/

/*
// ※ Looping Arrays: The for-of Loof (ES6 도입)
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
*/

/*
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
