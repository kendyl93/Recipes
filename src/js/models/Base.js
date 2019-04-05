export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchRecipesList: document.querySelector('.results__list'),
  searchResults: document.querySelector('.results')
};

export const elementStrings = {
  loaderClass: 'loader'
};

export const renderLoader = parent => {
  const { loaderClass } = elementStrings;

  const loader = `
    <div class="${loaderClass}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const { loaderClass } = elementStrings;
  const loader = document.querySelector(`.${loaderClass}`);

  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};