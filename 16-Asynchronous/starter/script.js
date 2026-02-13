'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const request = fetch(`https://restcountries.com/v2/name/canada`);
console.log(request);

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
