import axios from 'axios';
import { KEY } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const recipe = await axios(
        `https://www.food2fork.com/api/get?key=${KEY}&rId=${this.id}`
      );
      const {
        title,
        publisher,
        image_url,
        source_url,
        ingredients
      } = recipe.data.recipe;

      this.title = title;
      this.publisher = publisher;
      this.image_url = image_url;
      this.source_url = source_url;
      this.ingredients = ingredients;
    } catch (error) {
      console.error(error);
    }
  }

  calculatePreparingTime() {
    const ingredientsNumber = this.ingredients.length;
    const periods = Math.ceil(ingredientsNumber / 3);
    this.time = periods * 15;
  }

  calculateServings() {
    this.servings = 4;
  }
}
