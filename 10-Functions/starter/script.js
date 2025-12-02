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
