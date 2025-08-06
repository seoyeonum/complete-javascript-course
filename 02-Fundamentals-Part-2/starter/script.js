'use strict';
/*
// 위 문구가 맨 처음 작성되면 strict mode 가 활성화
// 각 script 마다 strict mode를 두고 쓰는걸 beginner 에게 추천함
// 1. 특정 작업 금지함
// 2. 에러를 명시적으로 보여줌

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive :D");

// strict mode 활성화 시,
// → script.js:10 Uncaught ReferenceError: hasDriverLicense is not defined

// const interface = "Audio";
// const private = 534;
// const if = 23;
// → Uncaught SyntaxError: Unexpected strict mode reserved word


// functions
function logger() {
  console.log("My name is Seoyeon");
}

// calling / running / invoking function
logger();
logger();
logger();

// function as machine - food processor
function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number("23");


// function declarations
const age1 = calcAge1(1991);

function calcAge1(birthYear) {
  // const age =
  // return age;
  return 2037 - birthYear;
}

// function expression

// function declaration 과 달리 function expression은 함수 선언 전 호출이 불가능하다.
// const age2 = calcAge2(1991);
// → Uncaught ReferenceError: Cannot access 'calcAge2' before initialization

// 함수 이름을 부여하지 않음 → anonymous function
// 아래 function은 사실 "식"이다. 식은 "value"를 생성한다.
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);
console.log(age1, age2);

// 어떤 타입의 function 을 사용하는지는 개발자 개인의 퓌향 문제이다.
// Jonas 는 expression을 선호하지만, 대부분은 expression을 선호.
// 물론 두 가지 다 구별하고 사용하는 방법을 익혀야 한다.


// Arrow functions
const calcAge3 = (birthYear) => 2037 - birthYear;
// 중괄호가 필요 없으며, 암묵적으로 return 없이 값을 반환(저장)한다.
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1980, "Bob"));

// functions calling other functions
function cutFruitProcessor(fruit) {
  return fruit * 3;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitProcessor(apples);
  const orangePieces = cutFruitProcessor(oranges);

  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitProcessor(2, 3));


const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} is retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
};

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));


// arrays 는 data structure 이다.
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";

const friends = ["Michael", "Steven", "Peter"];
console.log(friends);

// array는 0을 기반으로 index 값을 가진다.
const y = new Array(1991, 1984, 2008, 2020);
console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = "Jay";
console.log(friends);
// array 가 const 로 선언되었더라도 그 요소의 변경은 가능
// → only primitive values are immutable(불변의)
// array 는 primitive values 가 아니다. → mutated

// friends = ["Bob", "Alice"];
// → Uncaught TypeError: Assignment to constant variable.

const firstName = "Jonas";
const jonas = [firstName, "Schmedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);
console.log(jonas.length);

// exercise
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};
const years = [1990, 1967, 2002, 2010, 2018];

// console.log(calcAge(years));
// → NaN

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];
console.log(ages);


// Basic array operations (methods)
const friends = ["Michael", "Steven", "Peter"];

// Add elements
const newLength = friends.push("Jay"); // push: 맨 끝에 배열 요소를 추가
console.log(friends);
console.log(newLength); // → 4
// push 메서드는 배열의 길이를 반환

friends.unshift("John"); // unshift: 맨 앞에 배열 요소를 추가
// unshift 메서드는 배열의 길이 반환
console.log(friends);

// Remove elements
friends.pop(); // pop: Last(맨 끝) element를 제거
const popped = friends.pop();
console.log(popped); // → Peter
// popped 메서드는 제거된 요소를 반환
console.log(friends);

friends.shift(); // shift: Firtt(맨 앞) element를 제거
console.log(friends);

// Search elements
console.log(friends.indexOf("Steven")); // → 1
// indexOf 메서드는 해당 요소의 index를 반환
console.log(friends.indexOf("Bob")); // → -1
// 존재하지 않는 요소의 경우 -1 반환

friends.push(23);
console.log(friends.includes("Steven")); // → true
console.log(friends.includes("Bob")); // → false
// includes 메서드는 해당 요소의 존재 여부를 Boolean 값으로 반환
console.log(friends.includes("23")); // → false
console.log(friends.includes(23)); // → true
// includes 메서드는 strict equality 를 따른다.
// 즉, type coercion 을 행하지 않는다. (그렇기 때문에 유용함)

if (friends.includes("Steven")) {
  console.log("You have a friend called Steven");
}


// ※ 저장 시 문자열 자동 쌍따옴표 해제 방법
// Settings > (검색) quote > Prettier: Single Quote 항목
// ✅ Use single instead of double quotes. (체크박스 설정)
// → 현재 자동 들여쓰기를 위하여
// Prettier 를 Code Formatter 로 사용하고 있기 때문

// ※ 저장 시 자동 개행 완화 방법
// Settings > (검색) Prettier > Prettier: Print Width 항목
// 기존 80 → 120 변경 (즉, 자동 개행의 기준 화면 폭을 넓힘)

// objects
const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmetmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
};
// 5 property(속성)를 가지고 있는 object 'jonas'
// array 와 달리 각 개체들의 순서(order)가 중요하지 않다.

console.log(jonas);

// using dot notation
// → 간단하므로 보편적으로 사용
console.log(jonas.lastName);

// using bracket notation
// → key에 대한 조작이 필요할 때 사용
console.log(jonas['lastName']);

const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);

// console.log(jonas.'last' + nameKey);
// → Uncaught SyntaxError: Unexpected string

const interestedIn = prompt(
  'What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends'
);
// console.log(jonas.interestedIn); // → undefined
console.log(jonas[interestedIn]);

if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);
} else {
  console.log(
    'Wrong request! Choose between firstName, lastName, age, job, and friends'
  );
}

jonas.location = 'Protugal';
jonas['twitter'] = '@jonasschmedtmann';
console.log(jonas);

// Challenge
// "Jonas has 3 friends, and his best friend is called Michael"
console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his best friends is called ${jonas.friends[0]}`
);
*/

// object methods
const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmetmann',
  birthYear: 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
  hasDriversLicense: true,

  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // },

  // calcAge: function () {
  //   // console.log(this); // → jonas
  //   return 2037 - this.birthYear;
  // },

  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  }, // → 메서드 사이에도 콤마(,)가 있어야 한다.

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-years old teacher and he has ${
      this.hasDriversLicense ? 'a' : 'no'
    } driver's license.`;
  },
};

// console.log(jonas.calcAge(1991));
// console.log(jonas['calcAge'](1991));
console.log(jonas.calcAge());

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

// Challenge
// "Jonas is a 46-year old teacher and he has a/no driver's license"
console.log(jonas.getSummary());
