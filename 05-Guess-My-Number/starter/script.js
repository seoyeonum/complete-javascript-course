'use strict';

/*
// DOM & DOM Manupulation
// querySelector(), textContent
console.log(document.querySelector('.message').textContent);

// DOM (Document Object Model)
// HTML 과 JavaScript 를 이어주는 역할
// DOM Tree Structure 에서 Document는 DOM의 가장 상위 요소이다.
// → Document is special object that is entry point to the DOM.

// DOM !== JavaScript
// DOM 과 DOM Methods, DOM Properties는 JavaScript와 교류할 수 있는 Web API의 일부이다.
// (Web API 에는 DOM 외에도 Timers, Fetch 등이 있다.)

document.querySelector('.message').textContent = '🎉 Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// input 필드에서 값을 가져오기 위해서는 .value를 사용
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

// Events is something that happens on the page.
// With an EventListener,
// we can wait that certain events happen and then reat to it.

// making the random number
// Math.random(): between 0 and 1 (never include 1)
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// 점수는 값이 계속 변경되어야 하므로 let 타입으로 선언
let score = 20;
let highscore = 0;

// addEventListener 는 특수한 형태의 function이라고 보면 된다.
// → parameter를 2개 건네 받는다.
// 1) 'click' 이벤트 발생 시
// 2) 다음 작업을 수행
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';

    // When player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    document.querySelector('.number').textContent = secretNumber;

    // element 선택 시 . 이나 # 없이 엘리먼트명만 작성!
    // css 속성 편집 시 .style 붙여준 뒤 필요한 속성 작성(속성명은 Camel 표기법을 따름)
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }

    // When guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});

////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #1

/*
Implement a game rest functionality,
so that the player can make a new guess!
Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and number variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 🙂
*/

// 1. selecting element with the 'again' class and attach a click event handler
document.querySelector('.again').addEventListener('click', function () {
  // 2. restore initial values
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // 3. restore the initail conditions
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';

  // 4. restore the original styles
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
