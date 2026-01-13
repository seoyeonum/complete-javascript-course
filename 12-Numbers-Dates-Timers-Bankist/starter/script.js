'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));
  console.log(combinedMovsDates);

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementDate);
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${movement.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// day/month/year

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, '0');
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, '0');
    const min = `${now.getMinutes()}`.padStart(2, '0');
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add Loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// ※ Converting and Checking Numbers
console.log(23 === 23.0); // → true

// Base 10 - 0 to 9. 1/10 - 0.1 3/10 = 3.333333
// Binary base 2 - 0 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // → false
// 이진법에서는 0.1을 표현했을 때 위와 같은 문제가 발생한다.
// (이는 JavaScript의 오류이므로, 받아들여야 한다.)

// 1) Number() - 명시적 형변환
console.log(Number('23')); // → 23

// 2) '+' - 암묵적 형변환
console.log(+'23'); // → 23
// '+'를 붙이면 type coercion(자동 형변환)에 따라 숫자로 변환

// 3) Parsing
console.log(Number.parseInt('30px', 10)); // → 30
console.log(Number.parseInt('e23', 10)); // → NaN
// Parsing 은 숫자만을 찾아 변환한다. 단, 숫자로 시작해야만 가능하다.
// parseInt(문자열, 진법) : 진법 생략 시 10진법 적용되나 명시하는 게 오류를 피할 수 있다.

console.log(Number.parseFloat('   2.5rem   ')); // → 2.5
console.log(Number.parseInt('   2.5rem   ')); // → 2.5
// 문자열 공백은 무시된다.

// console.log(parseFloat('   2.5rem   ')); // → 2.5
// parsing 메소드는 global functions 이므로 Number을 생략할 수 있으나,
// 이는 오래된 방식이므로, Number Object과 함께 호출하는 방식을 권장.

// 4) isNaN
// Checking if value is NaN
console.log(Number.isNaN(20)); // → false
console.log(Number.isNaN('20')); // → false
console.log(Number.isNaN(+'20X')); // → true

console.log(23 / 0); // → Infinity
console.log(Number.isNaN(23 / 0)); // → false (무한대도 NaN는 아니므로..!)

// 5) isFinite
// Checking if value is number
console.log(Number.isFinite(20)); // → true
console.log(Number.isFinite('20')); // → false
console.log(Number.isFinite(+'20X')); // → false
console.log(Number.isFinite(23 / 0)); // → false
// 어떤 값이 숫자인지 확인하는 가장 적합한 method

// 6) isInteger
// 어떤 값이 정수인지 여부만을 확인한다면 isInteger도 적합하다.
console.log(Number.isInteger(23)); // → true
console.log(Number.isInteger(23.0)); // → true
console.log(Number.isInteger(23 / 0)); // → false
*/

/*
// ※ Math and Rounding

// 1) sqrt (square root)
console.log(Math.sqrt(25)); // → 5
console.log(25 ** (1 / 2)); // → 5
console.log(8 ** (1 / 3)); // → 2

// 2) max, min
console.log(Math.max(5, 18, 23, 11, 2)); // → 23
console.log(Math.max(5, 18, '23', 11, 2)); // → 23 (type coercion 적용O)
console.log(Math.max(5, 18, '23p', 11, 2)); // → NaN (parsing 적용X)

console.log(Math.min(5, 18, 23, 11, 2)); // → 2

// 3) PI
console.log(Math.PI); // → 3.141592653589793
console.log(Math.PI * Number.parseFloat('10px') ** 2); // → 314.1592653589793

// 4) random, trunc(내림), floor
console.log(Math.random()); // 0~1 사이의 랜덤한 값 발생
console.log(Math.trunc(Math.random() * 6 + 1)); // 1~6의 랜덤한 정수값 발생

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(10, 20));
console.log(randomInt(0, 3));

// 5) Rounding Integers: trunc, round, ceil, floor
// type coercion이 적용된다.
console.log(Math.trunc(23.3)); // → 23 // 소수점 절삭
console.log(Math.round(23.3)); // → 23 // 반올림
console.log(Math.round(23.9)); // → 24

console.log(Math.ceil(23.3)); // → 24 // 올림
console.log(Math.ceil(23.9)); // → 24

console.log(Math.floor(23.3)); // → 23 // 내림
console.log(Math.floor('23.9')); // → 23

// trunc와 floor은 음수와 함께 쓸 때 차이가 생긴다.
console.log(Math.trunc(-23.3)); // → -23
console.log(Math.floor(-23.3)); // → -24

// 6) Rounding decimals
// toFixed 는 문자열을 반환, 괄호 안의 숫자는 소수점 자리수이다.
console.log((2.7).toFixed(0)); // → 3(문자열)
console.log((2.7).toFixed(3)); // → 2.700(문자열)
console.log((2.345).toFixed(2)); // → 2.35(문자열)
console.log(+(2.345).toFixed(2)); // → 2.35(숫자)
// String methods 와 유사하게,
// 원시형(primitive)은 자동으로 Boxing 되어 Math형태가 되므로, 메소드를 바로 쓸 수 있다.
*/

/*
// ※ The Remainder Operator (나머지 연산자)

console.log(5 % 2); // → 1
console.log(5 / 2); // → 2.5
// 5 = 2 * 2 + 1

console.log(8 % 3); // → 2
console.log(8 / 3); // 2.6666666666666665
// 8 = 2 * 3 + 2

// even: 0, 2, 4, 6, 8, 10, ...
// odd: 1, 3, 5, 7, 9, ...

console.log(6 % 2); // → 0
console.log(6 / 2); // → 3

console.log(7 % 2); // → 1
console.log(7 / 2); // → 3.5

// 홀짝 확인 함수
const isEven = n => n % 2 === 0;

console.log(isEven(8)); // → true
console.log(isEven(23)); // → false
console.log(isEven(514)); // → true

// (로그인 후) 잔액 클릭 시, 짝수 행 배경 칠하기
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6, ...
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9, ...
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/

/*
// ※ Numeric Seperator (ES2021 이후 버전)
// 큰 숫자를 "_" 로 구분하여 가독성을 높여줌

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter); // → 287460000000
// 실제로 _는 무시된 채 log된다. (개발자 가독성만 높여줌)

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;
// 밑줄 만으로는 의미를 다르게 해석할 여지가 있다.

// const PI = 3._1415;
const PI = 3.1415;
console.log(PI); // 3.1415
// 숫자 맨 앞, 소수점과 인접한 위치 등에 _를 사용할 경우 에러 발생

console.log(Number('230_000')); // → NaN
// 위 경우 숫자를 제대로 작성해주어야 변환이 가능하다.

console.log(parseInt('230_000')); // → 230
// 문자가 포함된 부분 직전까지만 Parsing 된다.
*/

/*
// ※ Working with BigInt (ES2020+)

console.log(2 ** 53 - 1); // → 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // → 9007199254740991
// (자바스크립트가 표현할 수 있는 가장 큰 숫자)

console.log(2 ** 53 + 1); // → 9007199254740992
// (자바스크립트가 정확한 답을 표현할 수 없어짐.)

// 데이터베이스 ID 혹은 실제 60비트 숫자 이상을 사용 시 더 큰 숫자가 필요하다.
// ES2020+부터는 BigInt가 추가되어 더 큰 숫자를 쓸 수 있게 됐다.

// 1) 끝에 n 붙이기
console.log(92073825087459872436873469742395n);
// (숫자만 썼을 때) → 9.207382508745987e+31
// (끝에 n 붙일 때) → 92073825087459872436873469742395n

// 2) BigInt 생성자 활용하기 (BigInt로 변환)
console.log(BigInt(92073825087));
// → 92073825087n

// Operations
console.log(10000n + 10000n);
// → 20000n
console.log(987452947359287019803487109n * 10000000n);
// → 9874529473592870198034871090000000n
// console.log(Math.sqrt(16n));
// → Cannot convert a BigInt value to a number at Math.sqrt

const huge = 23423987089082507358n;
const num = 23;
console.log(huge * BigInt(num));
// → 538751703048897669234n

// Exceptions
// 1) 논리연산자
console.log(20n > 15); // → ture
console.log(20n === 20); // → false
// === 의 경우, type coercion 이 적용되지 않는다.
console.log(typeof 20n); // → bigint

console.log(20n == '20'); // → ture
// == 의 경우, type coercion 이 적용된다.

// 2) 문자 결합(concat)
console.log(huge + ' is REALLY big!!!');
// → 23423987089082507358 is REALLY big!!!
// BigInt 라도 잘 표현된다.

// Divisions
console.log(10n / 3n); // → 3n (소수점 부분이 잘림)
console.log(10 / 3); // → 3.3333333333333335
*/

// ※ Creating Dates
/*
// 현재 시각 가져오기
const now = new Date();
console.log(now);
// → Mon Jan 12 2026 16:13:51 GMT+0900 (한국 표준시)

// 직접 작성하기
console.log(new Date('Mon Jan 12 2026 16:12:23'));
// → Mon Jan 12 2026 16:12:23 GMT+0900 (한국 표준시)
console.log(new Date('December 24, 2015'));
// → Thu Dec 24 2015 00:00:00 GMT+0900 (한국 표준시)

console.log(new Date(account1.movementsDates[0]));
// → Tue Nov 19 2019 06:31:17 GMT+0900 (한국 표준시)

console.log(new Date(2037, 10, 19, 15, 23, 5));
// → Thu Nov 19 2037 15:23:05 GMT+0900 (한국 표준시)
// (JavaScript에서 Month 는 0~11로 구성)

console.log(new Date(2037, 10, 33));
// → Thu Dec 03 2037 00:00:00 GMT+0900 (한국 표준시)
// (초과된 일자에 대해서는 자동으로 정상 날짜로 변환)

console.log(new Date(0));
// → Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 259200000 이 값을 TimeStamp라고 부른다.
// → Sun Jan 04 1970 09:00:00 GMT+0900 (한국 표준시)
*/

/*
// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // → Thu Nov 19 2037 15:23:05 GMT+0900 (한국 표준시)
console.log(future.getFullYear()); // → 2037
console.log(future.getMonth()); // → 10
console.log(future.getDate()); // → 19
console.log(future.getDay()); // → 4
console.log(future.getHours()); // → 15
console.log(future.getMinutes()); // → 23
console.log(future.getSeconds()); // → 0
console.log(future.toISOString()); // → 2037-11-19T06:23:00.000Z
console.log(future.getTime()); // → 2142224580000

console.log(new Date(2142224580000)); // → Thu Nov 19 2037 15:23:00 GMT+0900 (한국 표준시)

console.log(Date.now()); // → 1768202807004

future.setFullYear(2040);
console.log(future); // → Mon Nov 19 2040 15:23:00 GMT+0900 (한국 표준시)
*/
