// Coding Challenge #2

/*
This is more of a thinking challenge than a coding challenge 🤓

Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!
2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  // 아래 콜백 함수가 실행될 때, 위 IIFE는 이미 실행되어 사라졌다.
  // 콜백 함수가 생성된 환경은 사라졌지만,
  // closure 로 인하여 생성 환경(lexical environment)은 남아있고 콜백 함수가 접근할 수 있다.
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
