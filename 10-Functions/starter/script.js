'use strict';
/*
// ※ Default Parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5까지 parameter에 default value를 부여하는 방식
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123'); // → {flightNum: 'LH123', numPassengers: 1, price: 199}
createBooking('LH123', 2, 800); // → {flightNum: 'LH123', numPassengers: 2, price: 800}

// parameter를 다른 parameter에 의존적이게 작성하는 것도 가능하다(function 참고)
createBooking('LH123', 2); // → {flightNum: 'LH123', numPassengers: 2, price: 398}
createBooking('LH123', 5); // → {flightNum: 'LH123', numPassengers: 5, price: 995}

// parameter를 건너뛸 수 없지만, undefined를 건네주면 동일한 결과를 도출할 수 있다.
createBooking('LH123', undefined, 1000); // → {flightNum: 'LH123', numPassengers: 1, price: 1000}
*/

/*
// ※ How Passing Arguments Works: Value vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flight, passenger) {
  flight = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas); // → Check in
// console.log(flight); // → LH234
// console.log(jonas); // → {name: 'Mr.Jonas Schmedtmann', passport: 24739479284}

// Its the same as doing...
// const flightNum = flight;
// primitive) 복사된 것 분이기 때문에 원본 flight은 변하지 않았다.
// const passenger = jonas;
// reference) 메모리 힙에 있는 객체에 대한 참조만 복사한 것이므로 같은 것을 가리킨다. (원본 변화)

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(jonas);
checkIn(flight, jonas); // → Wrong passport!

// passing by value vs. passing by references
// ※ 자바스크립트는 참조를 통한 전달이 없다.
// (혼란스럽겠지만) 참조를 전달한 것처럼 보여도, 결국 참조도 메모리 주소가 포함된 "값"이기 때문
*/

/*
// ※ Functions Accepting Callback Functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
  // 표현식으로 공백을 찾아 없앤 뒤 소문자 변환
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  // 공백 기준으로 문자열 나눈 위 destructuring으로 첫 단어와 나머지(rest pattern) 문자 분리
  return [first.toUpperCase(), ...others].join(' ');
  // 첫 단어는 대문자로 변환, 나머지는 spread operator로 나누고 공백 문자를 기준으로 합치기
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`); //.name은 모든 JS fn에 사용 가능!
};

transformer('JavaScript is the best!', upperFirstWord);
// →
// Original string: JavaScript is the best!
// Transformed string: JAVASCRIPT is the best!
// Transformed by: upperFirstWord

transformer('JavaScript is the best!', oneWord);
// →
// Original string: JavaScript is the best!
// Transformed string: javascriptisthebest!
// Transformed by: oneWord

// ※ JS uses callbacks all the time
// (장접1) 코드가 기능적으로 잘 나뉘어 있다.
// (장점2) 콜백 함수로 추상화(abstraction)를 만들 수 있다
// : 자세한 내용을 숨길 수 있다.
// : 콜백 함수가 어떻게 구성되어있는지 신경쓰지 않아도 된다.

const high5 = function () {
  console.log('👋🏻');
};

document.body.addEventListener('click', high5);
// (본문(body) 클릭 시 콘솔) → 👋🏻

['Jonas', 'Martha', 'Adam'].forEach(high5);
// →
// 👋🏻
// 👋🏻
// 👋🏻
*/

/*
// ※ Functions Returning Functions
// functions을 반환(return)하는 functions 을 살펴보자.

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas'); // → Hey Jonas
greeterHey('Steven'); // → Hey Steven
// 위 코드의 작동 구조는 closure 와 관련이 있다.(추후 학습)

greet('Hello')('Jonas'); // → Hello Jonas

// Challenge (convert into Arrow Fn)
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Hi')('Joshua'); // → Hi Joshua
// (짧지만 가독성이 떨어진다.)
*/

/*
// ※ The call, apply and bind Methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
// → Jonas Schmedtmann booked a seat on Lufthansa flight LH239
lufthansa.book(635, 'John Smith');
// → John Smith booked a seat on Lufthansa flight LH635

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');
// → Uncaught TypeError: Cannot read properties of undefined (reading 'airline')
// book은 lufthansa.book method를 copy해온 다른 function이다.
// 즉, 더 이상 book fn 내의 this 키워드가 가리키는 값이 존재하지 않는다.

// 1. Call method: 첫 번째 인수는 this 키워드가 가리키는 값을 의미
book.call(eurowings, 23, 'Sarah Williams');
// → Sarah Williams booked a seat on Eurowings flight EW23
console.log(eurowings);
// → {name: 'Eurowings', iataCode: 'EW', bookings: {flight: 'EW23', name: 'Sarah Williams'}}
// book method는 lufthansa 내에 있지만, 이를 가져와 this 키워드가 다른 값을 가리키도록 돕는 call method

book.call(lufthansa, 239, 'Mary Cooper');
// → Mary Cooper booked a seat on Lufthansa flight LH239
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
// → Mary Cooper booked a seat on Swiss Air Lines flight LX583
console.log(swiss);

// 2. Apply method: call method 와 유사
// : this 키워드가 가리킬 인수 외에는 arr 로 넘긴다는 특징이 있다.
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
// → George Cooper booked a seat on Swiss Air Lines flight LX583
console.log(swiss);

// 모던 자바스크립트에서는 call 함수를 사용, spread 연산자로 배열을 풀어서 넘기는걸 선호
book.call(swiss, ...flightData);
// → George Cooper booked a seat on Swiss Air Lines flight LX583

// 3. Bind method: this 키워드가 지칭할 값만 인수로 받아 새 함수를 반환

// call method 형태와 비교
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');
// → Steven Williams booked a seat on Eurowings flight EW23

// 여러 인수를 받아 bind method 에 의해 반환된 함수는 해당 값들을 고정한다.
// 따라서, 사용할 때는 채워지지 않은 함수만 받으면 된다!
// (partial application)
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
// → Jonas Schmedtmann booked a seat on Eurowings flight EW23
bookEW23('Martha Cooper');
// → Martha Cooper booked a seat on Eurowings flight EW23

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  // console.log(this);
  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// → NaN
// this 키워드가 event listener 안에서 쓰이는 경우, 개체 자체를 가리키게 된다.
// 즉, 위 코드에서 this 는 button element를 지칭
// 따라서 this 키워드의 지칭 대상을 수동으로 지정해줄 필요가 있다.

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// → 301

// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); // → 220

// this 키워드가 존재하지 않을 경우 관습적으로 null 을 둔다.
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23

console.log(addVAT(100)); // → 123
console.log(addVAT(23)); // → 28.29

// bind method 사용하지 않고 같은 작업을 수행해보자
// hint: use functions returning functions
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100)); // → 123
console.log(addVAT2(23)); // → 28.29
*/

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// ※ IIFE (이프이)
// : Immediatley Invoked Function Expressions;
// : 즉시 함수 호출식
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();
// 함수 이름을 쓰지 않으면
// → Uncaught SyntaxError: Function statements require a function name
// (전체를 괄호 안에 넣으면)
// → (에러 안 남!)
// (실행하기 위에 뒤에 괄호)()
// → (즉시 호출) This will never run again

// console.log(isPrivate);
// → Uncaught ReferenceError: isPrivate is not defined

// ※ Arrow fn의 즉시 호출 함수 표현식
(() => console.log('This will ALSO never run again'))();
// → This will ALSO never run again

{
  const isPrivate = 23;
  var notPrivate = 46; // 블록을 무시하기 때문에 외부에서도 인식할 수 있음
}
// console.log(isPrivate); // → Uncaught ReferenceError: isPrivate is not defined
console.log(notPrivate); // → 46
