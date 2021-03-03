import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeServ: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeServ.getRecipe(this.id);
      }
    );
  }

  deleteRecipe() {
    this.recipeServ.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addToShoppingList() {
    this.recipeServ.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onCheckboxChange(e: { target: { checked: any; }; }, index: number) {    
    let checkedIngredient = this.recipeServ.getRecipe(this.id).ingredients[index];
    if (e.target.checked) {
      this.recipeServ.addSingleIngredientToShoppingList(checkedIngredient);
    }
  }

}
