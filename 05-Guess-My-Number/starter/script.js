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
const secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = secretNumber;

// 점수는 값이 계속 변경되어야 하므로 let 타입으로 선언
let score = 20;

// addEventListener 는 특수한 형태의 function이라고 보면 된다.
// → parameter를 2개 건네 받는다.
// 1) 'click' 이벤트 발생 시
// 2) 다음 작업을 수행
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
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
