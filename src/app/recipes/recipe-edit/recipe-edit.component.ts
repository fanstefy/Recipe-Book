import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  id: number;
  editMode = false;
  toAddIngredient = false;

  constructor(private route: ActivatedRoute,
              private recipeServ: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.formInit();
      }
    );
  }

  formInit() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeSteps = new FormArray([]);
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeServ.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                // Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );          
        }
      }          
      if (recipe.steps) {
        for (let step of recipe.steps) {          
          recipeSteps.push(new FormGroup({
            'step': new FormControl(step, Validators.required)
          }));
        }
      }  
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'steps': recipeSteps,
      'ingredients': recipeIngredients,
    });
  }

  onSubmit() {    
    let stepsArray = [];
    this.recipeForm.value.steps.forEach(element => {
      stepsArray.push(element.step);
    }); 
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      stepsArray,
      this.recipeForm.value.ingredients,
    );
    if (this.editMode) {
      this.recipeServ.updateRecipe(this.id, newRecipe);
    } else if (!this.editMode) {
      this.recipeServ.addNewRecipe(newRecipe);
    }
    this.cancelEdit();
  }

  // Dodaj sastojke
  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
    this.toAddIngredient = true;
  }

  // Dodaj korake pripreme
  addStep() {
    (<FormArray>this.recipeForm.get('steps')).push(new FormGroup({
      'step': new FormControl(null, Validators.required),
    }));
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  deleteCookingStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
  }

  cancelEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
