'use strict';

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
