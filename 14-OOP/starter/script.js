'use strict';

/*
// ※ Constructor Functions and the new Operator

// Constructor Function은 대문자로 시작
// Arrow Function으로 쓸 수 없다. (this 키워드가 존재하지 않기 때문)
const Person = function (firstName, birthYear) {
  // console.log(this); // → Person {}

  // Instance Properties
  this.firstName = firstName; // 인수와 속성이 같은 이름일 필요는 없지만, 관례임.
  this.birthYear = birthYear;

  // Never do this
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
  // (instance 가 생성될 때마다 수없이 많은 함수 생성...)
  // (Prototype 상속을 통해 해결해야 한다!)
};

const jonas = new Person('Jonas', 1991);
console.log(jonas); // → Person {firstName: 'Jonas', birthYear: 1991}

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);
// →
// Person {firstName: 'Matilda', birthYear: 2017}
// Person {firstName: 'Jack', birthYear: 1975}

const jay = 'Jay';

console.log(jonas instanceof Person); // → true
console.log(jay instanceof Person); // → false

// ※ Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // → 46
matilda.calcAge(); // → 20

// Object의 prototype 확인하기
console.log(jonas.__proto__); // → {calcAge: ƒ}
console.log(jonas.__proto__ === Person.prototype); // → true

console.log(Person.prototype.isPrototypeOf(jonas)); // → true
console.log(Person.prototype.isPrototypeOf(matilda)); // → true
console.log(Person.prototype.isPrototypeOf(Person)); // → false

// A.isPrototypeOf(B)
// : A가 B의 프로토타입 체인 어딘가에 존재하는가?
// (그래서 .prototypeOfLinkedObjects 가 더 정확한 느낌!)

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);
// → Homo Sapiens Homo Sapiens

console.log(jonas.hasOwnProperty('firstName')); // → true
console.log(jonas.hasOwnProperty('species')); // → false
// jonas 객체 내부에 있는 것이 아니므로, false..!

// ※ Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__);

// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__); // → null

console.dir(Person.prototype.constructor); // → ƒ Person(firstName, birthYear)

const arr = [3, 6, 5, 4, 4, 5, 3]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // → true

console.log(arr.__proto__.__proto__);

// Add new method of Array
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique()); // → [3, 6, 5, 4]
// (단, 혼자 진행하는 작은 프로젝트가 아닌 이상 위와 같은 방식은 지양하는 것이 좋다.)
// 1) 이미 동일한 이름의 메서드가 존재할 수 있기 때문!
// 2) 팀에서 작업 시 수많은 버그가 발생할 수 있기 때문!

const h1 = document.querySelector('h1'); // 6~7단계로 구성된 prototype
console.dir(x => x + 1);
*/

// ※ ES6 Classes

// class expression
// const PersonCl = class {}

// class declaration
// (class 도 일종의 function 이라고 이해하기!)
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // class 내부, constructor 외부에 behavior 작성 시
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica); // → PersonCl {firstName: 'Jessica', birthYear: 1996}
jessica.calcAge(); // → 41

console.log(jessica.__proto__ === PersonCl.prototype); // → true

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet(); // → Hey Jessica

// **Class 를 활용하여 작업 시 주의할 점**
// 1. Classes are NOT hoisted
// 2. Class are first-class citizens
// 3. Classes are executed in strict mode

// constructor function 을 사용하는 것과 class 를 사용하는 것은
// 온전히 개발자 취향의 차이이다.
// (Class 를 사용하면, 시각적으로 모든 게 하나로 집합되어 있어 깔끔해보인다는 장점이 있다.)

// 어느쪽이든, "프로토타입"과 "프로토타입의 상속"에 대해 이해하는 것이 중요하다..!
