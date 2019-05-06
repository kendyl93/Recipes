import { elements } from '../models/Base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
  const { recipe } = elements;
  recipe.innerHTML = '';
};

const formatCount = count => {
  if (count) {
    const [int, dec] = count
      .toString()
      .split('.')
      .map(number => parseInt(number, 10));

    if (!dec) {
      return count;
    }

    if (int === 0) {
      const fractional = new Fraction(count);
      return `${fractional.numerator}/${fractional.denominator}`;
    } else {
      const onlyDecimal = count - int;
      const fractional = new Fraction(onlyDecimal);

      return `${int} ${fractional.numerator}/${fractional.denominator}`;
    }
  }
  return '?';
};

export const renderRecipe = recipe => {
  const { recipe: recipeDiv } = elements;
  const {
    image_url,
    title,
    time,
    servings,
    publisher,
    source_url,
    ingredients
  } = recipe;

  const ingredientMarkup = ingredient => {
    const { count, unit, ingredient: ingredientName } = ingredient;
    return `<li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${unit}</span>
            ${ingredientName}
        </div>
    </li>
    `;
  };
  const markup = `
        <figure class="recipe__fig">
        <img src="${image_url}" alt="${title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart-outlined"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${ingredients
              .map(ingredient => ingredientMarkup(ingredient))
              .join(' ')}
        </ul>

        <button class="btn-small recipe__btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${source_url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;

  recipeDiv.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsIngrediends = recipe => {
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.servings;

  const countElements = Array.from(document.querySelectorAll('.recipe__count'));
  countElements.forEach((element, i) => {
    element.textContent = formatCount(recipe.ingredients[i].count);
  });
};
