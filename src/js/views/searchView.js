import { elements } from '../models/Base';

const { searchInput, searchRecipesList } = elements;

export const inputValue = () => searchInput.value;

export const clearInputValue = () => {
  searchInput.value = '';
};

export const clearSearchRecipesList = () => {
  searchRecipesList.innerHTML = '';
};

const renderRecipe = recipe => {
  const { recipe_id, image_url, title, publisher } = recipe;

  const markup = `
    <li>
        <a class="results__link results__link" href="#${recipe_id}">
            <figure class="results__fig">
                <img src="${image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${title}</h4>
                <p class="results__author">${publisher}</p>
            </div>
        </a>
    </li>
    `;
  searchRecipesList.insertAdjacentHTML('beforeend', markup);
};

export const renderRecipes = recipes => {
  recipes.map(recipe => renderRecipe(recipe));
};
