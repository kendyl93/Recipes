import axios from 'axios';
export default class Search {
  constructor(query) {
    this.query = query;
  }

  async axiosAPIrequest() {
    const KEY = '11730e31820bef72836b43f4f01d1aa7';

    try {
      const result = await axios(
        `https://www.food2fork.com/api/search?key=${KEY}&q=${this.query}`
      );
      const {
        data: { recipes }
      } = result;
      this.recipes = recipes;
    } catch (error) {
      console.error(error);
    }
  }
}
