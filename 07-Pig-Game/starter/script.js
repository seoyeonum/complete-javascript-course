'use strict';
// - setting each socre to 0
// - hiding the dice
// - 주사위 굴리기, 누적합 만들기

// Selecting elements
const score0El = document.querySelector('#score--0'); // id 선택 시 # 이용
const score1El = document.getElementById('score--1'); // id 로 선택하는 다른 방법
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
// querySelector 를 좀 더 자주 사용하지만
// getElementById 가 조금 더 빠르다.
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`; // img 태그의 src 변경

  // 3. Check for rolled 1: if true, switch to next player
  // main case 먼저 작성
  if (dice !== 1) {
    // Add dive to current score
    currentScore += dice;
    current0El.textContent = currentScore; // CHANGE LATER

    // Switch to next player
    // another case 작성
  } else {
  }
});
