import Search from './models/Search';

const state = {};

const controlSearch = async () => {
  const initialQuery = 'Pizza';

  if (initialQuery) {
    state.search = new Search(initialQuery);

    await state.search.axiosAPIrequest();

    console.info({ search: state.search.recipes });
  }
};

document.querySelector('.search').addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});
