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
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // 기존 HTML 변경하기
  // .textContent = 0

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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
// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);

// 입출금 소계 작성
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // 입금이 있을 때마다 1.2%의 이자를 지급
  // 이자가 1 이상인 경우에만 이자 소계에 합산하여 사용자에게 지급
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // optional operator로 currentAccount 미존재 시 undefined 반환
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // ('Transfer valid');
    // console.log();
    // Doing the transper
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

// account 삭제 상황 가정해보기
// (참고: find 와 findIndex는 모두 ES6 이후에 나온 Methods 이다.)
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('Delete');

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // findIndex 는 indexOf 와 유사하지만,
    // indexOf 는 배열에 요소 포함 여부에 따른 인덱스 값을 반환하고,
    // findIndex 는 보다 복잡한 조건을 추가할 수 있다.

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

/*
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

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max); // → 3000
*/

/*
// ※ The Magic of Chaining Methods
// map, filter, reduce 메소드를 따로 사용하는 게 아니라 한 번에 엮어서 사용할 수도 있다.
// (단, 디버깅이 어려울 수 있다. 따라서, 각 단계를 확인 후 연결하는 것이 좋다.)

// 따라서,
// 1) Chaining을 과도하게 사용해서는 안된다.
// : 배열이 정말 큰 경우 수많은 메서드를 연결하면 성능 문제 발생 가능하므로 최적화를 고려해야 한다.
// (작은 메서드들로 줄여야 한다.)

// 2) 원본 배열을 변형하는 것은 좋지 않다.
// : 대표적으로 splice, reverse 가 있다. 직접 chaining에 연결하지 않는 것이 관행이다.

// PIPELINE
const eurToUsd = 1.1;
console.log(movements);

const totalDepositUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD); // → 5522.000000000001
*/

/*
// ※ The find methods
// 조건을 기반으로 값을 검색하는 메서드
// 콜백함수를 전체 배열 요소에 대해 반복해서 실행한다.
// "filter method와 달리 조건을 만족하는 첫 번째 값을 반환한다."
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements); // → [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(firstWithdrawal); // → -400

console.log(accounts);
// →
// {
//  {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}
//  {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}
//  {owner: 'Steven Thomas Williams', movements: Array(8), interestRate: 0.7, pin: 3333, username: 'stw'}
//  {owner: 'Sarah Smith', movements: Array(5), interestRate: 1, pin: 4444, username: 'ss'}
// }

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
// → {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

let accountFind = {};
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') accountFind = acc;
}
console.log(accountFind);
// → {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}
*/

/*
// ※ The New findLast and findLastIndex Methods
// - findLast: find 와 유사하나 배열 끝에서부터 조건에 부합하는 요소를 찾는다.
// - findLastIndex: findIndex 와 유사하나 배열 끝에서부터 조건에 부합하는 요소의 인덱스를 찾는다.

console.log(movements);
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal); // → -130

// 'Your latest large movement was X movements ago'
const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 2000
);
console.log(latestLargeMovementIndex);
console.log(
  `Your latest large movement was ${
    movements.length - latestLargeMovementIndex
  } movements ago`
);
// → Your latest large movement was 5 movements ago
*/

/*
// ※ some and every

// EQUALITY
console.log(movements); // → [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements.includes(-130)); // → true
// 위와 같이, includes 메소드는 정확히 해당 값과 일치하는 요소의 유무를 나타낸다.

// SOME: CONDITION
// 특정 조건에 부합하는 요소의 유무를 알고 싶다면 some 메소드를 활용 가능하다.
console.log(movements.some(mov => mov === -130)); // → true

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // → true

// EVERY
// 모든 배열 요소가 특정 조건에 부합하는지의 유무를 알고 싶다면 every 메소드를 활용 가능하다.
console.log(movements.every(mov => mov > 0)); // → false
console.log(account4.movements.every(mov => mov > 0)); // → true

// Separate callback
// 함수를 따로 정의한 후 이를 some, every, filter 등에 결합해서 사용할 수도 있다.
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // → true
console.log(movements.every(deposit)); // → false
console.log(movements.filter(deposit)); // → [200, 450, 3000, 70, 1300]
*/

/*
// ※ flat and flatMap

// 1) flat
// : callback 함수 없이 배열을 (1레벨에 한하여) flat 하게 만들 수 있다.
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // → [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // → [[Array(2)], 3, 4, Array(2), 7, 8]

// 중첩된 정도가 깊다면, flat 의 depth를 인수로 지정할 수 있다.
console.log(arrDeep.flat(2)); // → [[Array(2)], 3, 4, Array(2), 7, 8]

// bankist 앱에서의 모든 입출금 내역을 flat하여 합산하고 싶다면,
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements); // → [Array(8), Array(8), Array(8), Array(5)]
// const allMovements = accountMovements.flat();
// console.log(allMovements); // → [200, 450, -400, 3000, ... , 1000, 700, 50, 90]
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance); // → 17840

// chaining 활용하여 모든 입출금 내역 합산
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance); // → 17840

// 2) flatMap
// map 거친 후 flat 작업까지 수행하는 메서드
// 단, flat 과 달리 1레벨만큼의 flat 만 가능하므로, 중첩 정도가 크다면 flat 이용해야!
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2); // → 17840
*/

/*
// ※ Sorting Arrays
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

// Strings
// sort: 알파벳 순 정렬, 원본 배열 변경
console.log(owners.sort()); // → ['Adam', 'Jonas', 'Martha', 'Zach']
console.log(owners); // → ['Adam', 'Jonas', 'Martha', 'Zach']

// Numbers
console.log(movements); // → [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements.sort()); // → [-130, -400, -650, 1300, 200, 3000, 450, 70]
// : sort 메소드는 문자열 기반 정렬을 수행한다.

// sort의 callback 함수에서
// return < 0 → a가 b보다 먼저 정렬(A, B) (keep order)
// return = 0 → (keep order)
// return > 0 → b가 a보다 먼저 정렬(B, A) (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);
// → [-650, -400, -130, 70, 200, 450, 1300, 3000]

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
// → [3000, 1300, 450, 200, 70, -130, -400, -650]
*/

/*
// ※ Array Grouping

console.log(movements);
// → [200, 450, -400, 3000, -650, -130, 70, 1300]

// groupBy
// 그룹화할 그룹과 콜백 함수를 인수로 받는다.
const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposit' : 'withdrawals'
);
console.log(groupedMovements);
// → {deposit:[200, 450, 3000, 70, 1300], withdrawals: [-400, -650, -130]}

const groupByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;

  if (movementCount >= 8) return 'very active';
  if (movementCount >= 4) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});
console.log(groupByActivity);
// →
// {active : [{owner: 'Sarah Smith', ...}],
// very active : [{owner: 'Jonas Schmedtmann', ...}, {owner: 'Jessica Davis', ...}, {owner: 'Steven Thomas Williams', ...}]

// const groupedAccounts = Object.groupBy(accounts, account => account.type);
// console.log(groupedAccounts);
const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedAccounts);
// →
// {premium: [{owner: 'Jonas Schmedtmann', ...}, {owner: 'Steven Thomas Williams', ...}],
// standard: {owner: 'Jessica Davis', ...},
// basic: [{owner: 'Sarah Smith', ...}]}
*/

/*
// ※ More Ways of Creating and Filling Arrays
// (empty arrays and fill methods)

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
// →[1, 2, 3, 4, 5, 6, 7]

// new Array 생성자에 인수를 하나만 건네면 빈 배열이 생성된다.
const x = new Array(7);
console.log(x); // → [empty × 7]

console.log(x.map(() => 5)); // → [empty × 7]
// 빈 배열에 인수를 채우기 위해서는 map이 아닌 fill 이 필요하다.

// 1) Array.fill
// fill은 원본 배열을 변경한다.
// x.fill(1);
// console.log(x); // → [1, 1, 1, 1, 1, 1, 1]

// fill(채울 요소, 첫 인덱스, 끝 인덱스)
x.fill(1, 3, 5);
console.log(x); // → [empty × 3, 1, 1, empty × 2]

// 기존 배열 요소의 변경도 가능하다.
arr.fill(23, 4, 6);
console.log(arr); // → [1, 2, 3, 4, 23, 23, 7]

// 2) Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // → [1, 1, 1, 1, 1, 1, 1]

// Underbar(_)는 버려지는 변수를 의미한다.
// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // → [1, 2, 3, 4, 5, 6, 7]

// API로부터 data를 받아오는 대신,
// 화면에 그려진 data를 가져와 배열 만들기

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'), // 쿼리 선택자로 배열 요소 가져와
    el => Number(el.textContent.replace('€', '')) // 콜백 함수로 유로 기호 제거
  );

  console.log(movementsUI);
  // → [1300, 70, -130, -650, 3000, -400, 450, 200]

  // 아래와 같이 spread operator 를 활용하는 방법도 있다.
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementsUI2);
});
*/

/*
// ※ Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with

console.log(movements);
// → [200, 450, -400, 3000, -650, -130, 70, 1300]

// 1) toReversed
// slice 한 뒤 reverse 하면 원본 배열이 훼손되지 않는다. (non-destructive)
// const reversedMov = movements.slice().reverse();

// 위 코드를 간결히 만든 메소드가 toReversed 이다.
const reversedMov = movements.toReversed();

console.log(reversedMov);
// → [1300, 70, -130, -650, 3000, -400, 450, 200]
console.log(movements);
// → [200, 450, -400, 3000, -650, -130, 70, 1300]

// 2) toSorted (sort), toSpliced (splice) 역시 유사한 방식으로 작동한다.

// 3) with
// movements[1] = 2000;
// console.log(movements);
// → [200, 2000, -400, 3000, -650, -130, 70, 1300]

// with 배열 사용 시 원본 배열은 훼손되지 않는다.
const newMovements = movements.with(1, 2000);
console.log(newMovements);
// → [200, 2000, -400, 3000, -650, -130, 70, 1300]
console.log(movements);
// → [200, 450, -400, 3000, -650, -130, 70, 1300]
*/

// ※ Array Methods Practice

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
// .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

let a = 10;
console.log(++a); // prefix
// console.log(a++); // postfix: 값은 변화시키지만, 이전값을 반환한다.
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals); // → 25180 -7340

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
