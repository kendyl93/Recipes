import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './models/Base';

const state = {};

const { searchForm, searchResults, searchResultsPages, recipe } = elements;
const { renderRecipes, clearInputValue, clearSearchRecipesList } = searchView;

const controlSearch = async () => {
  const inputValue = searchView.inputValue();

  if (inputValue) {
    state.search = new Search(inputValue);

    try {
      clearInputValue();
      clearSearchRecipesList();

      renderLoader(searchResults);
      await state.search.axiosAPIrequest();
      clearLoader();

      const { recipes } = state.search;

      renderRecipes(recipes);
    } catch (error) {
      console.info(error);
      clearLoader();
    }
  }
};

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

searchResultsPages.addEventListener('click', event => {
  const button = event.target.closest('.btn-inline');

  if (button) {
    const goToPage = parseInt(button.dataset.gotopage, 10);
    const { recipes } = state.search;
    clearSearchRecipesList();
    renderRecipes(recipes, goToPage);
  }
});

const controlRecipe = async () => {
  const recipeId = window.location.hash.replace('#', '');
  const { renderRecipe, clearRecipe } = recipeView;

  if (recipeId) {
    clearRecipe();
    renderLoader(recipe);

    state.recipe = new Recipe(recipeId);

    try {
      await state.recipe.getRecipe();

      const { recipe } = state;

      recipe.parseIngredient();
      recipe.calculateServings();
      recipe.calculatePrepareTime();

      clearLoader();
      renderRecipe(recipe);
    } catch (error) {
      console.error(error);
    }
  }
};

const WINDOW_EVENTS = ['hashchange', 'load'];
WINDOW_EVENTS.forEach(event => window.addEventListener(event, controlRecipe));
