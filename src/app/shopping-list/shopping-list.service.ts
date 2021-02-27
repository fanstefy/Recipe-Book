import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('krastavac', 2),
    new Ingredient('paradajz', 4),
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients;
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.emit(this.ingredients);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

}

