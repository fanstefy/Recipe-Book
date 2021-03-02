import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeClicked = new Subject<number>();


  private recipes = [
    new Recipe(
      "Pica",
      "Ljuta pica sa kulenom",
      "http://gojkospizza.rs/wp-content/uploads/2020/04/madjarica-bolja-copy-u1574.png",
      [
        new Ingredient("kecap", 1),
        new Ingredient("kackavalj", 2),
        new Ingredient("kulen", 10),
        new Ingredient("brasno", 3),
      ]
    ),
    new Recipe(
      "Torta",
      "Ukrasna torta sa ukrasima",
      "https://www.stvarukusa.rs/wp-content/uploads/2014/12/nova_godina_torta-1.jpg",
      [
        new Ingredient("brasno", 1),
        new Ingredient("secer", 1),
        new Ingredient("cokolada", 2)
      ]
    ),
    new Recipe(
      "Spagete",
      "Spagete sa bolonjeze sosom",
      "http://mladostle.com/wp-content/uploads/2018/03/mladost-spaghetti-bolognese.jpg",
      [
        new Ingredient("spagete", 1),
        new Ingredient("mleveno meso", 5),
        new Ingredient("mocarela", 2)
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes;
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
