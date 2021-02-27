import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeService } from './recipes/recipe.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    DropdownDirective,
    RecipeEditComponent,
    RecipeStartComponent,
    ShoppingEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
