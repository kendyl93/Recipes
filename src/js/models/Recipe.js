import axios from 'axios';
import { KEY } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const API_KEY = KEY[0];
      const recipe = await axios(
        `https://www.food2fork.com/api/get?key=${API_KEY}&rId=${this.id}`
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

  calculatePrepareTime() {
    const ingredientsNumber = this.ingredients.length;
    const periods = Math.ceil(ingredientsNumber / 3);
    this.time = periods * 15;
  }

  calculateServings() {
    this.servings = 4;
  }

  parseIngredient() {
    const longUnits = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds'
    ];
    const shortUnits = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound'
    ];
    const units = [...shortUnits, 'kg', 'g'];

    const parsedIngredients = this.ingredients.map(ingredient => {
      let currentIngredient = ingredient.toLowerCase();
      longUnits.forEach((unit, i) => {
        currentIngredient = currentIngredient.replace(unit, units[i]);
      });

      currentIngredient = currentIngredient.replace(/ *\([^)]*\) */g, ' ');

      const arrayIngredient = currentIngredient.split(' ');
      const unitIndex = arrayIngredient.findIndex(ingredientInArray =>
        units.includes(ingredientInArray)
      );

      let objectIngredient = {};
      if (unitIndex > -1) {
        const arrayCount = arrayIngredient.slice(0, unitIndex);

        let count;
        if (arrayCount.length === 1) {
          count = eval(arrayIngredient[0].replace('-', '+'));
        } else {
          count = eval(arrayIngredient.slice(0, unitIndex).join('+'));
        }

        objectIngredient = {
          count,
          unit: arrayIngredient[unitIndex],
          ingredient: arrayIngredient.slice(unitIndex + 1).join(' ')
        };
      } else if (parseInt(arrayIngredient[0], 10)) {
        objectIngredient = {
          count: parseInt(arrayIngredient[0], 10),
          unit: '',
          ingredient: arrayIngredient.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        objectIngredient = {
          count: 1,
          unit: '',
          ingredient: currentIngredient
        };
      }

      return objectIngredient;
    });
    this.ingredients = parsedIngredients;
  }

  updateServings(type) {
    const newServings =
      type === 'decrease'
        ? this.servings - 1
        : type === 'increase'
        ? this.servings + 1
        : this.servings;

    this.ingredients.forEach(ingredient => {
      ingredient.count *= newServings / this.servings;
    });
    this.servings = newServings;
  }
}
