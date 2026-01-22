'use strict';

// ※ Constructor Functions and the new Operator

// Constructor Function은 대문자로 시작
// Arrow Function으로 쓸 수 없다. (this 키워드가 존재하지 않기 때문)
const Person = function (firstName, birthYear) {
  // console.log(this); // → Person {}

  // Instance Properties
  this.firstName = firstName; // 인수와 속성이 같은 이름일 필요는 없지만, 관례임.
  this.birthYear = birthYear;

  // Never do this
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
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
