import Search from './models/Search';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './models/Base';

const state = {};

const { searchForm, searchResults, searchResultsPages } = elements;
const { renderRecipes, clearInputValue, clearSearchRecipesList } = searchView;

const controlSearch = async () => {
  const inputValue = searchView.inputValue();

  if (inputValue) {
    state.search = new Search(inputValue);

    clearInputValue();
    clearSearchRecipesList();

    renderLoader(searchResults);
    await state.search.axiosAPIrequest();
    clearLoader();

    const { recipes } = state.search;

    renderRecipes(recipes);
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

const recipe = new Recipe(47746);

recipe.getRecipe();

console.info({ recipe });

const controlRecipe = () => {};
