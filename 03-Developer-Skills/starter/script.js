// Remember, we're gonna use strict mode in all scripts now!
'use strict';

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
