import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './models/base';

const state = {};

const { searchForm, searchResults } = elements;

const controlSearch = async () => {
  const inputValue = searchView.inputValue();
  const { renderRecipes, clearInputValue, clearSearchRecipesList } = searchView;

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
