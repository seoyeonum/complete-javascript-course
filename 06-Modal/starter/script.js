'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
// 같은 클래스 속성을 지닌 여러 elements 선택 시 → .querySelectorAll 메소드
const btnsOpenModal = document.querySelectorAll('.show-modal'); // 리스트 형태

const openModal = function () {
  // console.log('Button clicked');
  modal.classList.remove('hidden'); // classList 에서 hidden 클래스를 제외
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal); // 클릭 시 호출될 함수 이름만 작성

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// keyboard event 는 글로벌 이벤트 중 하나
document.addEventListener('keydown', function (e) {
  console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    // console.log('Esc was pressed');
    closeModal();
  }
});
