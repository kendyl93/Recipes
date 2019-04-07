import axios from 'axios';
import { KEY } from '../config';
export default class Search {
  constructor(query) {
    this.query = query;
  }

  async axiosAPIrequest() {
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
