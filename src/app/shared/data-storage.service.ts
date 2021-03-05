import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://recipe-book-e41b5-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get('https://recipe-book-e41b5-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .map(
      (response: Response) => {
        const recipes = response.json();
        for (let recipe of recipes) {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      }
    )
    .subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
