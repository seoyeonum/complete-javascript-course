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

// ※ Styles, Attributes and Classes
// Styles (inline styles)
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // → (아무것도 나오지 않는다.)
console.log(message.style.color); // → (아무것도 나오지 않는다.)
console.log(message.style.backgroundColor); // → rgb(55, 56, 61)
// 직접 inline 설정한 값은 출력되지만,
// 참조해온 값이나 명시되지 않은 값은 출력되지 않는다.
// 실제 적용된 스타일 값을 찾아오기 위해서는, getComputedStyle을 통해 접근 가능하다.
console.log(getComputedStyle(message).color); // → rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // → 49px

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');

console.log(logo.alt); // → Bankist logo
console.log(logo.src); // → http://127.0.0.1:8080/img/logo.png
console.log(logo.className); // → nav__logo
// 각 element에 있어야하는 표준 속성(standard)에 한해서만
// 위 방식으로 속성을 찾아올 수 있다.

logo.alt = 'Beautiful mininalist logo';

// Non-standard
console.log(logo.designer); // → undefined
console.log(logo.getAttribute('designer')); // → Jonas
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // → http://127.0.0.1:8080/img/logo.png (절대경로로 출력)
console.log(logo.getAttribute('src')); // → img/logo.png (상대경로(있는 그대로)로 출력)

const link = document.querySelector('.twitter-link');
console.log(link.href); // → https://twitter.com/jonasschmedtman (절대경로로 출력)
console.log(link.getAttribute('href')); // → https://twitter.com/jonasschmedtman (절대경로로 출력)
// a 태그의 경우 둘 다 절대 경로로 출력

// 단, a 태그라도 아래와 같이 출력되기도 한다.
const link2 = document.querySelector('.nav__link--btn');
console.log(link2.href); // → http://127.0.0.1:8080/# (절대경로로 출력)
console.log(link2.getAttribute('href')); // → # (상대경로(있는 그대로)로 출력)

// Data attributes
// : HTML에서 data-version-number="3.0" 의 속성을 남길 경우,
// dataset으로 접근해 해당 값을 가져올 수 있다.
// (JS에서 접근 시 속성명은 Camel Case 사용해야 함에 유의)
console.log(logo.dataset.versionNumber); // → 3.0

// Classes
logo.classList.add('c', 'j'); // DOM 요소에 지정한 클래스 값 추가 (이미 있으면 중복 추가 X)
logo.classList.remove('c', 'j'); // DOM 요소에 지정한 클래스 값 제거 (이미 없으면 제거 X)
logo.classList.toggle('c'); // DOM 요소에 지정한 클래스 값이 없으면 추가하고, 있으면 제거
logo.classList.contains('c'); // DOM 요소에 지정한 클래스 값이 있는지 체크 (not 'includes')

// Don't use
// logo.className = 'jonas';
// 위와 같은 방식으로 지정 시 모든 className 이 'jonas'로 override
// 따라서, 위 방식은 지양해야 한다.
