import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';
import { CommonService } from 'src/app/shared/common.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListItem } from '../shopping-list-item.model';
import { ShoppingListItemService } from '../shopping-list-item.service';

@Component({
  selector: 'app-selected-recipes-list',
  templateUrl: './selected-recipes-list.component.html',
  styleUrls: ['./selected-recipes-list.component.css']
})
export class SelectedRecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  selectedRecipes: Recipe[] = [];
  shoppingListItems: ShoppingListItem[];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListItemService, private activatedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      data => {
        this.recipes = data.recipes;
      }
    );
    this.shoppingListItems = this.shoppingListService.shoppingListItems;
    this.selectedRecipes = this.getSelectedRecipes();
    if (this.selectedRecipes.length == 0) {
      this.commonService.showInfo('Recipes not selected!', 'You can select recipe from the Recipe section');
    }
    this.subscription = this.shoppingListService.itemChanged.subscribe(
      (items: ShoppingListItem[]) => {
        this.shoppingListItems = items;
        this.selectedRecipes = this.getSelectedRecipes();
      }
    );
  }

  getSelectedRecipes(): Recipe[] {
    let selectedRecipes: Recipe[] = [];
    for (let item of this.shoppingListItems) {
      if (item['recipeName']) {
        let recipe = this.recipes.find(recipe => recipe.name == item.recipeName);
        if (recipe && !selectedRecipes.includes(recipe)) {
          selectedRecipes.push(recipe);
        }
      }
    }
    return selectedRecipes;
  }

  isExistsInShoppingList(ingredient: Ingredient, recipe: Recipe): boolean {
    let findedItem = this.shoppingListItems.find(item => item.name == ingredient.name
      && item['recipeName']
      && item.recipeName == recipe.name);
    if (findedItem) {
      return true;
    } else {
      return false;
    }
  }

  onDeleteItemFromShoppingList(recipe: Recipe) {
    this.shoppingListService.deleteItemsByRecipeName(recipe.name);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
