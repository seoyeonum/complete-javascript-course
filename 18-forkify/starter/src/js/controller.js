import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// ※ HMR(Hot Module Replacement)
// : Parcel(번들러)에서 제공하는 기능으로
// 전체 페이지를 새로고침하지 않고 바뀐 모듈만 교체
// (HMR이 가능한 환경인지 체크 후 / “이 모듈은 업데이트를 받아도 괜찮다”고 선언)
if (module.hot) {
  module.hot.accept();
}

// const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    // Guards Clause
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    // guard clause
    if (!query) return;

    // 2)Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
////////////////////////////////////////////////

// ※ The MVC Architecture

// 1. Why worry about architecture?
// - Structure: the way we organize our code
// - Maintainability: easily change it in the future
// - Expandability: easily add new features
// → The perfect architecture

// 2. Components of any architecture (모든 아키텍쳐가 갖추어야 할 요소들)
// - Business Logic: code that solves the actual business
// - State: stores all the data about the application (e.g. Redux, MobX)
// - HTTP Library: responsible for making and receiving AJAX requests
// - Application Logic(Router): the implementation of application itself
// - Presentation Logic(UI Layer): the visible part of the application

// 3. The Model-View-Controller (MVC) Architecture
// 1) MODEL: Business logic, State, HTTP Library
//   - interacting with WEB
// 2) CONTROLLER: Application Logic
//   - bridge between model and view
//   - OLNY the controller imports and calls functions
// 3) VIEW : Presentation Logic
//   - interacting with USER
