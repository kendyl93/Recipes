import { elements } from '../models/Base';

const { searchInput, searchRecipesList } = elements;

export const inputValue = () => searchInput.value;

export const clearInputValue = () => {
  searchInput.value = '';
};

export const clearSearchRecipesList = () => {
  searchRecipesList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
  const limitable = title.length > limit;
  const newTitle = [];

  if (limitable) {
    title.split(' ').reduce((acc, currentTitle) => {
      if (acc + currentTitle.length <= limit) {
        newTitle.push(currentTitle);
      }
      return acc + currentTitle.length;
    }, 0);

    return `${newTitle.join(' ')}...`;
  }

  return title;
};

const renderRecipe = recipe => {
  const { recipe_id, image_url, title, publisher } = recipe;
  const shortenTitle = limitRecipeTitle(title);

  const markup = `
    <li>
        <a class="results__link results__link" href="#${recipe_id}">
            <figure class="results__fig">
                <img src="${image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${shortenTitle}</h4>
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
