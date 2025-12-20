'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// (아래 데이터는 API에서 받아온 데이터로 가정한다.
// 대부분 DB에서 가져온 데이터는 Object 형태이므로,
// 아래에서도 Map 대신 Object 형태를 사용한다.)
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// (실제 API 처럼 느껴지도록 아래와 같이 Array 형태로 묶었다.)
const accounts = [account1, account2, account3, account4];

// Elements
// (개발 편의를 위해 선택자로 elements를 구성해두었다.)
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // 기존 HTML 변경하기
  // .textContent = 0

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type
         movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
      `;

    // template literal로 만든 html을 추가
    // element.insertAdjacentHTML 메소드는 (삽입방식, string)의 2가지 인수 필요
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};
calcDisplayBalance(account1.movements);

const createUsernames = function (accs) {
  // 새로 배열을 만들려는 게 아니라, 원본 배열을 수정해야 하므로 forEach 사용
  accs.forEach(function (acc) {
    // acc 내에 username 속성 만들기
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts); // → stw

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// ※ Simple Array Methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// 1. SLICE
console.log(arr.slice(2)); // → ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // → ['c', 'd']
console.log(arr.slice(-2)); // → ['d', 'e']
console.log(arr.slice(-1)); // → ['e']
console.log(arr.slice(1, -2)); // → ['b', 'c']
console.log(arr.slice()); // → ['a', 'b', 'c', 'd', 'e']
console.log([...arr]); // → ['a', 'b', 'c', 'd', 'e']

// 2. SPLICE
// 원본 배열을 변경한다.(원래 배열의 일부를 가져오고 나머지는 남겨둔다.)
// console.log(arr.splice(2)); // → ['c', 'd', 'e']
// console.log(arr); // → ['a', 'b']
arr.splice(-1);
console.log(arr); // → ['a', 'b', 'c', 'd']

// Splice에서 두 번째 인수는 인덱스가 아니라, 삭제하려는 요소의 수!
const c = arr.splice(1, 2);
console.log(arr); // → ['a', 'd']
console.log(c); // →  ['b', 'c']

// 3. REVERSE
// 원본 배열을 변경한다.
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // → ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // → ['f', 'g', 'h', 'i', 'j']

// 4. CONCAT
const letters = arr.concat(arr2);
console.log(letters);
// → ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]);
// → ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// 5. JOIN
console.log(letters.join('-'));
// → a-b-c-d-e-f-g-h-i-j
*/

/*
// ※ The New at Method
// : ES2022부터 업데이트 된 at 메소드

const arr = [23, 11, 64];
console.log(arr[0]); // → 23
console.log(arr.at(0)); // → 23

// Getting last array element
console.log(arr[arr.length - 1]); // → 64
console.log(arr.slice(-1)[0]); // → 64
console.log(arr.at(-1)); // → 64
// 이처럼 .at 을 사용하면 마지막 요소의 값을 간단히 얻어낼 수 있다.
// 어떤 메서드를 이용할지는 상황에 따라 다르다.

// at 메서드는 String에도 이용 가능하다.
console.log('jonas'.at(0)); // → j
console.log('jonas'.at(-1)); // → s
*/

/*
// ※ Looping Arrays: forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----');
movements.forEach(function (mov, i, arr) {
  // 첫값, 인덱스, 배열
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// →
// Movement 1: You deposited 200
// Movement 2: You deposited 450
// Movement 3: You withdrew 400
// ...
*/

/*
// ※ forEach With Maps and Sets
// : forEach 메소드는 Array 뿐 아니라 Map과 Set 에서도 쓸 수 있다.

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// →
// USD: United States dollar
// EUR: Euro
// GBP: Pound sterling

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); // → Set(3) {'USD', 'GBP', 'EUR'}
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// →
// USD: USD
// EUR: EUR
// GBP: GBP

// 즉, Set 에서는 value와 key가 동일하다는 것인데,
// 이는 Set 에서는 별도의 key나 index가 존재하지 않기 때문!
// 따라서 key 인수를 생략할 수도 있었으나, 다른 forEach와 형식을 유지하여 개발자에게 혼란을 피하고자 함.

// 실제로 사용할 때는,
// 아래와 같이 _를 사용해 인수를 버리고, value 만 사용하면 된다.
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
// →
// USD: USD
// EUR: EUR
// GBP: GBP
*/

/*
// ※ Data Transformations: map, filter, reduce
// map: 각 요소를 연산 후 배열로 걸러냄
// filter: 특정 조건을 만족하는 요소만 배열로 걸러냄
// reduce: 각 요소를 돌며 하나의 값으로 결과 도출해냄

// ※ The map Method
const eurToUsd = 1.1;

// map의 활용 (modern JS에서 추구하는 함수형 프로그래밍)
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// arrow function 형태로 표현
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
// → [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movementsUSD);
// → [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// 기존 방식대로 풀이해도 같은 값을 얻을 수 있다.
const movementUSDfor = [];
for (const mov of movements) movementUSDfor.push(mov * eurToUsd);
console.log(movementUSDfor);
// → [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

const movementsDescriptions = movements.map(
  // 첫값, 인덱스, 배열
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
// → 'Movement 1: You deposited 200', 'Movement 2: You deposited 450', 'Movement 3: You withdrew 400', 'Movement 4: You deposited 3000', 'Movement 5: You withdrew 650', 'Movement 6: You withdrew 130', 'Movement 7: You deposited 70', 'Movement 8: You deposited 1300']
*/

/*
// ※ The filter Method
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits); // → [200, 450, 3000, 70, 1300]

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor); // → [200, 450, 3000, 70, 1300]

// 결과가 같다면 왜 for-of 대신 filter를 쓰는가?
// : chaining이 가능하여 더 활용도가 높기 때문!

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); // → [-400, -650, -130]
*/

// ※ The reduce Method
console.log(movements);

// (누적값, 현재값, 인덱스, 배열), acc의 첫 값
// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

//  → (acc의 연산 전 값이 출력)
// Iteration 0: 0
// Iteration 1: 200
// Iteration 2: 650
// Iteration 3: 250
// Iteration 4: 3250
// Iteration 5: 2600
// Iteration 6: 2470
// Iteration 7: 2540

// arrow function으로 변경
const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance); // → 3840
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2); // → 3840
