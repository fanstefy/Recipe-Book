import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  subscription: Subscription;

  constructor(private slServ: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slServ.getIngredients(); 
    this.subscription = this.slServ.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.slServ.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
