import { elements } from '../models/Base';

const { searchInput, searchRecipesList, searchResultsPages } = elements;

export const inputValue = () => searchInput.value;

export const clearInputValue = () => {
  searchInput.value = '';
};

export const highlightSelected = id => {
  const existingHighlighted = Array.from(
    document.querySelectorAll('.results__link')
  );
  existingHighlighted.map(highligted => {
    highligted.classList.remove('results__link--active');
  });

  document
    .querySelector(`a[href='#${id}']`)
    .classList.add('results__link--active');
};

export const clearSearchRecipesList = () => {
  searchRecipesList.innerHTML = '';
  searchResultsPages.innerHTML = '';
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

const createPaginationButton = (currentPage, type) => {
  const pageNumberToDisplay =
    type === 'prev' ? currentPage - 1 : currentPage + 1;
  const iconToDisplay = type === 'prev' ? 'left' : 'right';

  return `
  <button class="btn-inline results__btn--${type}" data-goToPage="${pageNumberToDisplay}">
    <span>Page ${pageNumberToDisplay}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${iconToDisplay}"></use>
    </svg>
  </button>
`;
};

const renderPaginationButtons = (
  currentPage,
  recipesNumber,
  recipesPerPage
) => {
  const allPages = Math.ceil(recipesNumber / recipesPerPage);
  const nextPageType = 'next';
  const previousPageType = 'prev';
  let button;

  if (currentPage === 1 && allPages > 1) {
    button = createPaginationButton(currentPage, nextPageType);
  } else if (currentPage < allPages) {
    button = `
      ${createPaginationButton(currentPage, previousPageType)}
      ${createPaginationButton(currentPage, nextPageType)}
      `;
  } else if (currentPage === allPages && allPages > 1) {
    button = `${createPaginationButton(currentPage, previousPageType)}`;
  }

  searchResultsPages.insertAdjacentHTML('afterbegin', button);
};

export const renderRecipes = (recipes, page = 1, recipesPerPage = 10) => {
  const start = (page - 1) * recipesPerPage;
  const end = page * recipesPerPage;

  recipes.slice(start, end).map(recipe => renderRecipe(recipe));

  renderPaginationButtons(page, recipes.length, recipesPerPage);
};
