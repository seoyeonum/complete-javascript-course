// ※ An Overview of Modules in JavaScript

// Module
// : Reusable piece of code that encapsulates implementation details.
// : Usually a standalone file, but it doesn't have to be.

// Why we use modules?
// 1) Compose software (SW 구성)
// : Modules are small building blocks
//  that we put together to build complex applications.
// 2) Isolate components (컴포넌트 분리, 독립성)
// : Modules can be developed in
//  isolation without thinking about the entire codebase.
// 3) Abstract code (추상화)
// : Implement low-level code in modules and
//  import these abstractions into other modules.
// 4) Organized code (조직화)
// : Modules naturally lead to a more organized codebase.
// 5) Reuse code (코드 재사용)
// : Modules allow us to easily reuse the same
//  code, even across multiple projects.

// Importing module

// 1) import 시 alias 지정해 받아오기
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // 1)
// 모든 import 구문은 hoisting top된다.
// 또한 모든 module은 자동으로 strict mode가 적용된다.
// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing module');
// console.log(shippingCost);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// 2) export 시 alias 지정해 내보내기

// 3) export 시 default 로 내보내고 import 시 alias 지정해 받아오기
// : 쉼표(,)로 구분해 default 와 다른 모듈 변수를 함께 가져올 수도 있다.
// (But, 보통 한 module 에서 이렇게 혼용해서 import 하지는 않는다.)
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // 3)
// console.log(price);

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);
// →
// {
//   {product: 'pizza', quantity: 2},
//   {product: 'bread', quantity: 5},
//   {product: 'apples', quantity: 4}
// }
// 즉, import 시 단순히 cart 값을 복사해온 것이 아니라,
// 주소값을 가져와 연결되어 있다는 것을 알 수 있다!
// (imports are not copies of exports. instead, like a live connection.)

/*
// ※ Top-Level await (ES2022)
// ES2022 이후 JS 모듈에서는 비동기 함수 외부에서 await 키워드를 사용할 수 있다.
// 아래와 같은 await은 전체 실행을 차단하고 있는데,
// 상황에 따라 이는 유용할 수도, 해로울 수도 있으니 신중히 활용해야 한다.

// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost); // Promise 반환

// NOT very clean
// lastPost.then(last => console.log(last)); // 기대했던 return value 반환

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/
/*
// ※ The Module Pattern
// 한 번만 호출하도록 할 수 있는 IIFE로 보통 작성
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (Shippinng cost is ${shippingCost})`,
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
// → {cart: Array(2), totalPrice: 237, totalQuantity: 23, addToCart: ƒ}
console.log(ShoppingCart2.shippingCost); // → undefined

// 이와 같이, IIFE를 활용하여 Private Module을 만들 수 있다.
// (이게 모듈 패턴의 구현이다.)
// 어떻게 이게 작동하는가? → "Closure" 때문!
*/
/*
// ※ CommonJS Modules
// : Node.js 환경에서 사용하는 모듈 시스템
// - 브라우저 밖의 서버 환경(Node.js)에서 만들어진 방법

// 문법1. Export
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart (Shippinng cost is ${shippingCost})`,
  );
};

// 문법2. Import
const {addToCart} = require('./shoppingCArt.js');
*/

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep, { slice } from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// Polyfill(충전솜)
// Babel은 ESNext 문법을 ES5로 번역하지만 ES6 이후에만 존재하는 개념은 번역하지 못한다.
// 따라서 이를 메꿔줄 polyfill 이 필요하며, 기존 babel-polyfill 모듈은 deprecated 되어
// 현재는 수동으로 입력해주어야 한다.

import 'core-js/stable';
// 번들 크기가 우려된다면 아래와 같이 cherry pick 해서 설치도 가능하다!
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polyfilling async functions
import 'regenerator-runtime/runtime';

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
