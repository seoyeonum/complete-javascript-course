'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}
// https://countries-api-836d.onrender.com/countries/
///////////////////////////////////////
/*
// ※ Our First AJAX Call: XMLHttpRequest
// old school way
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// 아래 데이터는 비동기 방식으로 값을 가져오기에
// 실행 때마다 그 순서가 달라질 수 있다.
getCountryData('korea (republic of)');
getCountryData('canada');
getCountryData('hungary');
*/

// ※ Welcome to Callback Hell
// callBack 함수의 실행 sequence를 만들어보자. (feat. Callback Hell)
/*
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
*/

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country 2
    // const [neighbour] = data.borders;
    // if (!neighbour) return;
    const neighbour = data.borders?.[0]; // use optional chaining

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// callback(1) 함수 내에서 callback 함수(2)를 실행했으므로
// 실행 순서가 항상 동일하다.
// getCountryAndNeighbour('hungary');
getCountryAndNeighbour('usa');

// ※ Callback Hell
// : 비동기 작업을 순서대로 처리하기 위해 중첩된 콜백이 많은 경우!
// - 들여쓰기 때문에 코드 앞부분이 삼각형으로 보이는 게 특징!
// - ES6 이후부터는 "promise" 를 사용해 이를 벗어날 수 있다.
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// ※ Promises and the Fetch API

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// const request = fetch(`https://restcountries.com/v2/name/canada`);
// console.log(request);

// ※ What are PROMISES?
// : An object that is used as a placeholder for the future result of an asynchronous operation
// = A container for an asynchronously delivered value
// = A container for a future value (response from AJAX call)

// ※ Promise 의 장점
// 1. 비동기 결과를 처리하기 위해 이벤트와 콜백 함수에 의존할 필요가 없어진다.
// 2. 함수의 중첩 대신 promise를 연결하여 콜백 지옥을 벗어날 수 있다.
// ** promise 는 ES6 이후 버전부터 가능하다.

// ※ the promise lifecycle
// 1) Pending
// ↓ ASYNC TASK
// 2) Settled (fulfilled or rejected)

// ※ Consuming Promises

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//       // response.json() 역시 비동기 함수이다. (즉, promise 를 반환한다.)
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
    return response.json();
  });
};
// ※ Chaining Promises
// : instead of callback hell, use flat chain of promises
/*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      response => {
        console.log(response);
        if (!response.ok)
          throw new Error(`Country not found (${response.status})`);
        return response.json();
      }, // err => alert(err),
    )
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders?.[0];
      const neighbour = 'adsdfs';

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);

      // do NOT do like below
      // fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then(
      // response => response.json(),
      // );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
      // err => alert(err),
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // ※ Handling Rejected Promises
      // 일일히 err 처리하는 대신 catch 구문으로 한 번에 처리 가능
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      // 항상 일어나야 하는 일의 경우 finally 사용 (로딩 스피너 등)
      countriesContainer.style.opacity = 1;
    });
};
*/

/*
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found',
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // ※ Handling Rejected Promises
      // 일일히 err 처리하는 대신 catch 구문으로 한 번에 처리 가능
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      // 항상 일어나야 하는 일의 경우 finally 사용 (로딩 스피너 등)
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('hungary');
});

// ※ Throwing Errors Manually
getCountryData('australia');
*/

/*
console.log('Test start'); // 1
setTimeout(() => console.log('0 sec timer'), 0); // 5
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res); // 4
});
console.log('Test end'); // 2

// (1, 2) 콜백 함수 밖에 위치한 코드가 먼저 처리된다.
// (3) 마이크로 작업 대기열에 있는 코드가 먼저 처리된다.
// (4) 마이크로 작업 대기열에 있으며 작업이 무거운 코드가 나중에 처리된다.
// (5) 콜백 큐에 위치한 코드가 가장 나중에 처리된다.
// : setTimeout 으로 정교한 타이머 작업을 수행할 수 없다.
*/
/*
// ※ Building a Simple Promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`You WIN 💰`);
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

/*
// ※ Promisifying the Geolocation API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position), // 성공 시 callback (resolve에 position 넘기기)
    //   err => reject(err), // 에러 시 callback
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
    // *위와 동일하게, 자동으로 position이 전달된다.
  });
};

// getPosition().then(pos => console.log(pos));

// challenge1을 현재 위치 기준 조회로 refactoring
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);
      // Korea%20(the%20Republic%20of)
      // return fetch(`https://restcountries.com/v2/name/${data.countryName})`);
      return fetch(` https://restcountries.com/v3.1/alpha/${data.countryCode}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
    })
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);
*/

// ※ Consuming Promises with Async/Await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// async function
// - 동기식 코드처럼 보이지만,
// - 비동기로 내부에 있는 코드를 수행하는 동안 백그라운드에서 계속 수행
// - 이후 프로미스를 자동으로 반환
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
    );

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // ※ async/await 문법은 fetch/then 문법의 syntactic sugar*라는 점을 명심하자.
    // (*문법적 설탕; 개발자의 편의를 위해 concreat syntax 를 확장한 것)
    // fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
    //   console.log(res),
    // );

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryCode}`,
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[2] || data[1] || data[0]);
    // 여러 나라가 검색되는 관계로, 한국 기준으로 인덱스 2를 추가
    // 그 외의 경우 인덱스 1,0 국가가 조회되도록 설정
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
};
whereAmI();
whereAmI();
whereAmI();
console.log('FIRST');

// ※ Error Handling With try...catch
// - Java 에서도 전통적으로 사용된 에러 처리 방식

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }
