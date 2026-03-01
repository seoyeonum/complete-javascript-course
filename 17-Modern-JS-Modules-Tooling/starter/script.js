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
