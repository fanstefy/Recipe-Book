import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeClicked = new Subject<number>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes = [
    new Recipe(
      "Crock Pot Roast",
      "Ultimate Slow Cooker Pot Roast that leaves you with tender meat, vegetables and a built in gravy to enjoy them all with in just 15 minutes of prep! Perfect weeknight dinner!",      
      "https://amindfullmom.com/wp-content/uploads/2016/01/Pot-Roast-Crock-Pot.jpg",
      [
        "Place beef roast in crock pot.",
        "Mix the dried mixes together in a bowl and sprinkle over the roast.",
        "Pour the water around the roast.",
        "Cook on low for 7-9 hours."
      ],
      [
        {
          "amount": "1",
          "name": "beef roast",
        },
        {
          "amount": "1 package",
          "name": "brown gravy mix",
        },
        {
          "amount": "1 package",
          "name": "dried Italian salad dressing mix",
        },
        {
          "amount": "1 package",
          "name": "dry ranch dressing mix",
        },
        {
          "amount": "1/2 cup",
          "name": "water",
        }
      ]
    ),

  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes;   
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  updateRecipe(index: number, editedRecipe: Recipe) {
    this.recipes[index] = editedRecipe;
  }

  addNewRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addSingleIngredientToShoppingList(ingredient: Ingredient) {
    this.slService.addSingleIngredient(ingredient);
  }
 
}
