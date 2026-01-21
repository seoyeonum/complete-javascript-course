'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

// ※ Event Delegation (*delegation: 위임)
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

// ※ Tabbed Component

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));
// 똑같은 tab이 200개라면 동일한 함수가 200개 생성되며 웹이 느려질 것.

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard clause (가드 클로저)
  // : 조건이 참이 아닐 경우 함수를 종료,
  // 조건문을 단순화하고 코드 가독성을 높임
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ※ Menu fade animation
// (1. 모든 event handler function은 단 한 개의 인수만을 가질 수 있다.)
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
// (2. 따라서, bind 함수 및 this 키워드를 활용해 우회적으로 인수를 전달한다.)
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// mouseenter 은 event bubbling 이 발생 X (↔ mouseleave)
// mouseover 은 event bubbling 이 발생한다는 차이가 있다. (↔ mouseout)

// ※ Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   // scroll event 는 모든 스크롤 상황에서 발생하므로,
//   // (특히 모바일 환경에서) 성능이 매우 저하된다는 단점 존재.
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// ※ The Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// 1) threshold가 단일값의 경우
// : intersectionRatio가 threshold에 도달했을 때 observe method 실행
// 2) threshold가 배열의 경우
// : intersectionRatio가 각 threshold에 도달했을 때 observe method 실행

// *threshold(임계값, 한계점): 교차값(isIntersecting)이 true 가 되는 기준값(intersectionRatio)
// *intersectionRatio: viewport(보이는 공간)에서 차지하는 비중

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //%
  rootMargin: `-${navHeight}px`, // %, rem (X) px (O)
});
headerObserver.observe(header);

// ※ Reveal section
const allSections = document.querySelectorAll('.section');

// Callback Function
const revealSection = function (entries, observer) {
  // console.log(entries);
  // const [entry] = entries; // destructuring assignment
  // 보통 entry 하나만 받게 되어 쓰는 관례적 코드

  // entry 가 동시에 여럿 들어오게 되는 경우 forEach 로 쓰는 것이 안전하다.
  entries.forEach(entry => {
    // Guard clause
    if (!entry.isIntersecting) return; // 아무 것도 교차되지 않았다면, 아무것도 수행하지 말 것.

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target); // 해당 element를 더이상 관찰 X (다른 el은 관찰 유지)
  });
};

// Observer
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // null 일 때 기준은 viewport
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section); // observer에게 관찰 예약을 걸어두는 것 (+ 특정 임계점 통과 시 콜백함수 비동기 호출)
  // section.classList.add('section--hidden'); // remove class 실행
});

// ※ Lazy loading images
// (사양이 낮은 기기를 사용하는 사용자를 언제나 고려해야만 한다.)
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
// : img 중 data-src 속성을 가진 요소를 선택한다.

// Callback function
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // entry.target.classList.remove('lazy-img');
  // 직접 클래스를 없애기 보다는, load 시 event를 추가하는 걸 권장.
  // (데이터 속도가 느릴 경우, 저화질 이미지가 바로 노출될 수 있기 때문!)
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

// Observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// ※ Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;

const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible';

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// 0%, 100%, 200%

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
  );
};
goToSlide(0);

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

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

/*
// ※ DOM Traversing (*traverse: 횡단하다, 탐색하다)
// : 다른 요소를 기반으로 다른 요소를 선택하는 것

const h1 = document.querySelector('h1');

// 1) Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // → NodeList(2)
console.log(h1.childNodes); // → NodeList(9)
console.log(h1.children); // → HTMLCollection(3)
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// 2) Going upwards: parents
console.log(h1.parentNode); // → <div class="header__title">...</div>
console.log(h1.parentElement); // → <div class="header__title">...</div>
// 위 경우, parentNode도 element 이기 때문에 동일한 값이 출력

// ※ element.closest
// : 수많은 상위(부모) 요소 중 바로 위 요소 찾기 (클래스, 아이디 등으로)
h1.closest('.header').style.background = 'var(--gradient-secondary)';
// "가장 가깝다"는 본인 요소를 포함한다.
h1.closest('h1').style.background = 'var(--gradient-primary)';
// .closest ↔ .querySelector

// 3) Going sideways: siblings
// 직계 형제 요소만 가져올 수 있다.
console.log(h1.previousElementSibling);
// → null
console.log(h1.nextElementSibling);
// → <h4>A simpler banking experience for a simpler life.</h4>

// node 형태로도 찾을 수 있다.
console.log(h1.previousSibling); // → #text
console.log(h1.nextSibling); // → #text

// 모든 형제 요소를 가져오기 위해서는, 요소.부모.자녀 로 탐색!
console.log(h1.parentElement.children); // → HTMLCollection(4)
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
