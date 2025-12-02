'use strict';

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
