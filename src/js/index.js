import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './models/base';

const state = {};

const { searchForm } = elements;

const controlSearch = async () => {
  const inputValue = searchView.inputValue();

  if (inputValue) {
    state.search = new Search(inputValue);

    await state.search.axiosAPIrequest();

    console.info({ search: state.search.recipes });
  }
};

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});
