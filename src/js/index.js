import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './models/Base';
import { parse } from 'querystring';
import Likes from './models/Likes';

const state = {};
window.state = state;

const { searchForm, searchResults, searchResultsPages, recipe } = elements;
const { renderRecipes, clearInputValue, clearSearchRecipesList } = searchView;

// SEARCH CONTROLLER

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

// RECIPE CONTROLLER

const controlRecipe = async () => {
  const recipeId = window.location.hash.replace('#', '');
  const { renderRecipe, clearRecipe } = recipeView;
  const { highlightSelected } = searchView;
  const { search } = state;

  if (recipeId) {
    clearRecipe();
    renderLoader(recipe);

    if (search) {
      highlightSelected(recipeId);
    }

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

// LIST CONTROLLER

const controlList = () => {
  if (!state.list) {
    state.list = new List();
  }

  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

elements.shoppingList.addEventListener('click', event => {
  const id = event.target.closest('.shopping__item').dataset.itemid;

  if (id && event.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (event.target.matches('.shopping__count-value')) {
    const value = parseFloat(event.target.value, 10);
    state.list.updateCount(id, value);
  }
});

// LIKE CONTROLLER

const controlLike = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }

  const {
    id: currentId,
    title = '',
    author = '',
    image_url: image = ''
  } = state.recipe;

  if (!state.likes.isLiked(currentId)) {
    const newLike = state.likes.addLike(currentId, title, author, image);
    console.log({ LIKES: state.likes });
  } else {
    state.likes.deleteLike(currentId);
    console.log({ LIKES_DELETED: state.likes });
  }
};

elements.recipe.addEventListener('click', event => {
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('decrease');
      recipeView.updateServingsIngrediends(state.recipe);
    }
  }

  if (event.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('increase');
    recipeView.updateServingsIngrediends(state.recipe);
  }

  if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }

  if (event.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});
