'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

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
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  // 1) getBoundingClientRect
  // : 현재 좌표 출력 (*coordinate: 좌표)
  // 언제나 y == height, x == left 이며, 그 값은 viewport 에 따라 상대적이다.
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  // 2) window.scrollX, scrollY
  // : 스크롤 정도 출력
  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
  // window.pageXOffset and pageYOffset are deprecated now.

  // 3) document.documentElement.clientHeight, clientWidth
  // : 현재 viewport의 높이/너비 출력
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth,
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );
  // 현 viewport 에서의 s1coords(Section1 좌표)의 시작지점 left와 top을 page(0,0) 위치에서 더해서 scroll
  // + window.scrollx, window.scrollY
  // (scroll position을 s1coords.left와 top에 더한 위치로 이동)
  // (viewport에서 벗어난 영역만큼 더해주는 것!)

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth', // 부드럽게 이동
  // });

  // 최신 브라우저라면,
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// ※ Event Delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();

  // ※ Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/*
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
*/

/*
// ※ Types of Events and Event Handlers
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  // h1.removeEventListener('mouseenter', alertH1); // 실행 후 삭제
};

h1.addEventListener('mouseenter', alertH1);

// EventListener 삭제는 코드 어디에서나 가능하다.
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// old school way 1
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// old school way 2
// HTML element tag 안에 직접 명시

// 다른 방법 대신 addEventListener를 사용하는 이유(addEventListener의 장점)
// 1. 동일한 이벤트에 여러 이벤트 리스너를 추가할 수 있다.
// 2. 이벤트핸들러가 더 이상 필요하지 않을 경우 제거할 수 있다.

// ※ Event Propagation in Practice (*propagation: 전달)

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

// addEventListener 는 event의 캡쳐 단계의 이벤트는 수신하지 못하고,
// bubbling 단계의 이벤트는 수신함.

// .nav__link
document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('LINK');
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // 사용하지 않음이 좋으나, 알아는 두자!
  // e.stopPropagation();
});

// .nav__links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('LINK');
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

// .nav
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    console.log('LINK');
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  false,
);
// 기본값은 false. (true 지정 시, 캡쳐 단계에서의 이벤트까지만 수신함)
*/
