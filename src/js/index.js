import Search from './models/Search';

const search = new Search('Pizza');

console.info({ search });
search.axiosAPIrequest();
