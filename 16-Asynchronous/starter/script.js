'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// ※ Asynchronous JavaScript, AJAX and APIs

// 1. Synchronous
// - Most code is synchronous
// - Synchronous code is executed line by line
// - Each line of code waits for previos line to finish
// - Long-running operations block code execution

// 2. Asynchronous
// - Asynchronous code is executed after a task that runs in the "background" finishes
// - Asynchronous code is "non-blocking" (e.g. Timer with callback)
// - Execution doesn't wait for an asynchronous task to finish its work
// - Callback functions alone do NOT make code asynchronous

// 3. AJAX
// - Asynchronous JavaScript And XML
// : Allows us to communicate with remote web servers in an asynchronous way
// (즉, 웹 서버와 비동기 방식으로 통신할 수 있게 해주는 것)
// - With AJAX calls, we can request data from web servers dynamically

// 4. API
// - Application Programming Interface
// : piece of software that can be used by another piece of software,
// in order to allow applications to talk to each other
// - There are be many types of APIs in web development
// : DOM API, Geolocation API, Own Class API, "Online" API
// - "Online" API (API)
// : Application running on a server, that receives requests for data,
// and sends data back as response
// - We can build our own web APIs (requires bak-end development, e.g. with node.js) or use 3rd-party APIs.
