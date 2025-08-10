// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// { "singleQuote": true, "arrowParens": "avoid" } 의 형태로 저장된 .prettierrc
// 이 외에도 format에 있어 필요한 부분을 JSON 파일로 정의해둘 수 있다.
// ※ JSON 파일은 주석을 허용하지 않는다.

const x = '23';
if (x === 23) console.log(23);

const calcAge = birthYear => 2037 - birthYear;

console.log();
