import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    // Guards Clause
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes),
);
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

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
