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
