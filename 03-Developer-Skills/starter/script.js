// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
// { "singleQuote": true, "arrowParens": "avoid" } 의 형태로 저장된 .prettierrc
// 이 외에도 format에 있어 필요한 부분을 JSON 파일로 정의해둘 수 있다.
// ※ JSON 파일은 주석을 허용하지 않는다.

const x = '23';
if (x === 23) console.log(23);

const calcAge = birthYear => 2037 - birthYear;

// 수동으로 html 파일을 실행하지 않아도 extension을 통해 자동 실행 가능

// case 1. Live Server : 설치 후 JS 파일 하단의 Go Live 버튼 클릭
// ※ live server 가 자동 실행하는 html 파일은 프로젝트 폴더의 index.html 파일임

// case 2. node.js
// 로컬 설치 후 버전 확인
// : terminal에 node -v 입력 (npm 설치 시 버전 확인은 npm -v)
// → 10.9.3 (어떤 숫자든 관계 없음)

// live-server가 있는 npm 패키지를 설치해 local 어디서든 live-server를 이용할 수 있게(global) 함
// : terminal에 npm install live-server -g 입력
// ※ mac 이라면 1) npm 앞에 sudo 작성 2) pw 작성 없이 엔터
// ※ 이미 case 1에 따라 Live Server 설치되어 있다는 오류 메시지 발생할 수 있음

// index.html 파일 실행
// : terminal에 live-server 입력

console.log('Success installing node.js and live-server');


// learing how to code

// 1. 구체적인 목표 설정하기 ex. 1년 이내 웹 개발자가 될 것이다.
// 2. 배우는 코드를 이해하고 작성하기
// 3. 새로운 기능이나 개념을 배운 뒤 바로 활용하기 (지식 강화) ex. 메모, challenge 등
// 4. 강의 외 환경에서도 자기 만의 코드 작성하기 (프로젝트)
// 5. 처음부터 완벽한 코드를 작성하기 위해 노력하지 말기
// 6. 한 번에 너무 많은 것을 배우기 위해 애쓰지 말기 (의욕 잃지 않기)
// 7. 혼자 공부하지 않기 (온라인, 오프라인, ...) ex. SNS에 #100DaysOfCode 등 다른 사람에게 설명하거나 공유하기
// 8. 강의 과정을 들었다고 끝이라고 생각하지 말기 (시작일 뿐이다.)

// ※ 겁먹지 말고 미리 준비하고 성공하자 🔥

// how to think as developer : become a problem solver

// 1. 차분하고 천천히. 계획을 건너뛰지 말기
// 2. 논리적이고 이성적인 접근하기
// 3. 4-step framework 를 사용하기
//    1) 문제를 100% 이해하기 (Big Picture)
//    2) 분할하고 정복하기. 하위 문제부터 차근히 해결하기
//    3) 검색을 두려워하거나 부끄러워하지 말기. (google, stackoverflow, mdn, ...)
//    4) 실제 코드 작성 전에 의사코드(pseudo-code) 작성하기
//      : 규칙은 없다. 이해할 수 있는 수준이면 된다.

// + 세상 일에 대해 호기심과 자신감을 키우자.


// using google, stackoverflow, and mdn

// PROBLEM:
// We work for a company builing a smart home thermometer.
// Our most recent tadk is this:
// "Given an array of temperatures of one day, calculate the temperature amplitude.
// Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temp amplitude? Answer: differenxe between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what to do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array?
// - subtract min from max (amplitude) and return it

// stackoverflow 에서 코드를 복사하기보다는 이해하고 스스로 작성하기
const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
// calcTempAmplitude([3, 7, 4, 1, 8]);
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

// PROBLEM 2:
// Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? No! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays

const calcTempAmplitudeNew = function (t1, t2) {
  // const array1 = ['a', 'b', 'c'];
  // const array2 = ['d', 'e', 'f'];
  // const array3 = array1.concat(array2);

  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);


// debugging (fixing errors)

// 1. Identify: Becoming aware that there is a bug
// 2. Find: Isolating where exactly the bug is happening in code
// 3. Fix: Correct the bug
// 4. Prevent: Preventing it from happening again

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',

    // C) Fix
    // value: Number(prompt('Degrees celsious:')),
    value: 10,
  };

  // B) Find
  console.table(measurement);

  // console.log(measurement.value);
  // console.warn(measurement.value); → ⚠
  // console.error(measurement.value); → ⛔

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A) Identify
console.log(measureKelvin());

// Using a debugger
const calcTempAmplitudeBug = function (t1, t2) {
  // const array1 = ['a', 'b', 'c'];
  // const array2 = ['d', 'e', 'f'];
  // const array3 = array1.concat(array2);

  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    // Chrome > inspection > source 에서 직접 breakpoint 설정하는 대신,
    // 아래와 같이 JavaScript 내장 기능 사용 가능
    debugger; // → breakpoint로 인식
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) Identify
console.log(amplitudeBug);
*/

// The rise of AI tools (ChatGPT, Copilot, Cursor AI etc.)

// 1. 문제를 이해하고 작게 나누기
// 2. 어떤 AI를 사용할지 선택하기
// 3. AI가 코드를 생성
// 4. ★중요★ 검토하고 테스트하기: AI 코드에는 Bug나 Bad Code가 다량 존재할 수 있다.
// → solution 을 수정/향상시키며 2.~4. 반복
// 5. 코드 베이스에 merge 하기

// Before you use AI...
// - (AI에 의존하지 않고) 코드를 스스로 작성할 줄 알아야 한다. (Fundamental skills are 100% essectial!)
// - (AI에 의존하지 않고) 문제를 스스로 해결할 줄 알아야 한다.
// - 비판적으로 생각하는 힘이 필요하다.
// - 코딩하는 동안 호기심과 즐거움을 가져야 한다.

// ※ AI는 우리를 위협하기 위한 것이 아니라, 시간을 아껴주고 단순 작업을 줄여주기 위한 것이다.

// Incorporate AI code - AI 코드를 언제 사용(포함)해도 좋을까?
// - (AI 사용 전에) 스스로 코드를 머릿속으로 그릴 수 있는 경우
// - AI의 코드를 온전히 이해할 수 있는 경우
// - AI의 코드가 100% 맞다고 확신하는 경우
// - mission-critical parsts 에 사용하는 코드가 아닌 경우

// Will AI take our job?
// - 이미 AI 기반의 tool 은 우리 주변에 존재한다. AI 위협이 확대해석 되고 있을 뿐이다.
// - 자동화, 일상적 작업에 있어 번거로운 일이 크게 줄어들 것이다.
// - 핵심 비즈니스 로직 등 앱 구조에 있어서 제어 및 구현은 여전히 필요하다.
// - SW 개발자란 단순히 코드를 작성하는 것 이상으로 큰 그림을 그릴 수 있는 사람이다.
// - 다른 개발자, 특히 고객과 협업할 수 있는 것은 "사람" 개발자이다.
// - 여전히 AI 코드는 bug가 많으며, debugging이 어렵다. → 개선하는 사람은 필요하다.
// - 개발자보다 개발자가 만들어야 하는 SW가 지구상에 훨씬 많다.
