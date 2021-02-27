import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') shoppingLForm: NgForm;
  editMode = false;
  subscription: Subscription;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slServ: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slServ.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slServ.getIngredient(this.editedItemIndex);
        this.shoppingLForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.editMode);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slServ.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slServ.addNewIngredient(newIngredient);
    }    
    this.editMode = false;
    form.reset();
  }

  clearForm() {
    this.shoppingLForm.reset();
    this.editMode = false;
  }

  deleteIngredient() {
    this.slServ.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
