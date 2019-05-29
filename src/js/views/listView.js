import { elements } from '../models/Base';

export const renderItem = ({ id, count, unit, ingredient }) => {
  const markup = `
  <li class="shopping__item" data-itemId=${4}>
  <div class="shopping__count">
      <input type="number" value="${count}" step="${count}" class="shopping__count-value">
      <p>${unit}</p>
  </div>
  <p class="shopping__description">${ingredient}</p>
  <button class="shopping__delete btn-tiny">
      <svg>
          <use href="img/icons.svg#icon-circle-with-cross"></use>
      </svg>
  </button>
</li>`;

  elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
  const item = document.querySelector(`[data-itemId="${id}"]`);
  item.parentElement.removeChild(item);
};
