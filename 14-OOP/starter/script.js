'use strict';

// Array.from 은 Array Constructor 에 attached 된 함수이다.

//////////////////////////////////////////////////
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

Person.hey = function () {
  console.log('Hey there 🙌🏻');
  console.log(this);
};

Person.hey();
// →
// Hey there 🙌🏻
// ƒ (firstName, birthYear) {...}

// jonas.hey(); // → Uncaught TypeError: jonas.hey is not a function
// jonas 객체는 Person 객체의 hey()를 상속받지 못했다.

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

// ※ ES6 Classes

// class expression
// const PersonCl = class {}

// class declaration
// (class 도 일종의 function 이라고 이해하기!)
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // class 내부, constructor 외부에 behavior 작성 시
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    // 기존 property 와 충돌을 피하고자 _변수명 으로 작성하는게 관례!
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  // _변수명을 return 하기 위한 getter 생성
  get fullName() {
    return this._fullName;
  }

  // Static methods
  static hey() {
    console.log('Hey there 🙌🏻');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica); // → PersonCl {firstName: 'Jessica', birthYear: 1996}
jessica.calcAge(); // → 41
console.log(jessica.age); // → 41

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

// const walter = new PersonCl('Walter', 1965);
// → (alert) Walter is not a full name!
const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();
// →
// Hey there 🙌🏻
// class PersonCl {...}

// ※ Setters and Getters
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// Getter & Setter 사용 시
// 마치 property 인 것처럼 사용한다. (괄호X)
// console.log(account.latest());
console.log(account.latest); // → 300

// account.latest(50);
account.latest = 50;
console.log(account.movements); // → (5) [200, 530, 120, 300, 50]

// ※ Object.create
// 가장 직관적으로 보이지만 실제로 가장 적게 사용하는 방식이기도 하다.

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); // → 35

console.log(steven.__proto__ === PersonProto); // → true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge(); // → 58
*/
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

/*
// ※ Inheritance Between "Classes": Constructor Functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // call method (중요!!!)
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);
// 이 시점에서 Student.prototype = {}

// Student.prototype = Person.prototype
// 이렇게 하지 않은 이유?
// : 제대로된 prototype chain을 얻지 못한다.

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Coumputer Science');
// console.log(mike);
mike.introduce(); // → My name is Mike and I study Coumputer Scienc
mike.calcAge(); // → 17

console.log(mike.__proto__); // → Person {introduce: ƒ}
console.log(mike.__proto__.__proto__); // → {calcAge: ƒ}

console.log(mike instanceof Student); // → true
console.log(mike instanceof Person); // → true
console.log(mike instanceof Object); // → true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // → ƒ Student(firstName, birthYear, course)
*/

/*
// ※ Inheritance Between "Classes": ES6 Classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    // console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static methods
  static hey() {
    console.log('Hey there 🙌🏻');
    // console.log(this);
  }
}

// 단지 extends 키워드로 상속을 구현할 수 있다!
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Alwats needs to happen first!
    // PersonCl.call(this, fullName, birthYear) // call method 대신 super 사용
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // Override calcAGe method
  calcAge() {
    console.log(
      `I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`,
    );
  }
}

// 만약, 추가적인 property가 필요하지 않다면 constructor를 생성하지 않아도 된다...!
// const martha = new StudentCl('Martha Jones', 2012);

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
*/

/*
// ※ Inheritance Between "Classes": Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce(); // → My name is Jay and I study Computer Science
jay.calcAge(); // → 27

// ※ 실제 현실에서는 ES6 Classes(extend 키워드)를 사용하는 경우가 보편적이다!
*/

// ※ Encapsulation
// : Private Class Fields and Methods (ES2022)

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// STATIC version of these 4

class Account {
  // 1) Public fields : 필드 값과 이름만 입력하면 된다.
  locale = navigator.language;
  bank = 'Bankist';
  // 2) Private fields : 필드명 앞에 #(해시태그) 붙이기
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    this.movements = [];
    // this.bank = 'Bankist';
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface (API)
  // 3) Public methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  // 4) Private methods
  #approveLoan(val) {
    // Fake method
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }

  // // STATIC
  // static #test() {
  //   console.log('TEST');
  // }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.deposit(300);
// acc1.withdraw(100);
const movements = acc1
  .deposit(300)
  .withdraw(100)
  .withdraw(50)
  .requestLoan(25000)
  .withdraw(4000)
  .getMovements();

console.log(acc1);
// console.log(acc1.#movements);
// → Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class
// acc1.#approvedLoan(323);
// → Uncaught SyntaxError: Private field '#approvedLoan' must be declared in an enclosing class

// Account.test();
// → script.js:465 Uncaught TypeError: Account.test is not a function

console.log(movements);
