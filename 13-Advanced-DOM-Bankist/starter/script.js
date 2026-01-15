'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for 대신 forEach 활용
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

// ※ Selcting, Creating, and Deleting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
// document 는 실제 DOM 요소가 아니므로, documentElement로 선택해야 한다.

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections); // → NodeList(4)

document.getElementById('section--1');
// getElementById로 선택 시 . 이 필요하지 않다.
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // → HTMLCollection(9)
console.log(document.getElementsByClassName('btn')); // → HTMLCollection(5)

// HTMLCollection 은 NodeList 와 달리 "Life Collection"이라는 점에서,
// 변경사항 발생 시 HTMLCollection은 바로 업데이트 된다.
// (NodeList 는 바로 업데이트 되지 않는다.)

// Creating and inserting elements
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
header.append(message);

// prepend: 첫 번째 자식으로 추가
// append: 마지막 자식으로 추가
// message 는 life element 이므로, 항상 한 곳에서만 존재할 수 있다. (최종 코드에 따름)

// 만약, 동일한 element를 여러번 추가하고 싶다면 >> cloneNode 활용
// header.append(message.cloneNode(true));

// 특정 요소의 이전/이후에 element를 추가하고 싶다면 >> before/after 활용
// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // (참고: remove 는 최근에 생긴 methods)
    // 이전에는 아래와 같은 방법(DOM traversing)을 이용했다.
    // message.parentElement.removeChild(message);
  });
