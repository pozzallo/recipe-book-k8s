import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListItemDetails } from './shopping-list-item-details.model';
import { ShoppingListItem } from './shopping-list-item.model';
import { ShoppingListRestService } from './shopping-list-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListItemService {

  shoppingListItems: ShoppingListItem[] = [];
  itemChanged = new Subject<ShoppingListItem[]>();
  selectedItem = new Subject<ShoppingListItem>();

  constructor(private restService: ShoppingListRestService, private recipeService: RecipeService) { }

  // getShoppingListItems(){
  //   this.restService.getShoppingListItems().subscribe(
  //     items => {
  //       console.log('response: ' + items);
  //       this.shoppingListItems = items;
  //       this.itemChanged.next(this.shoppingListItems.slice());
  //       console.log('itemChanged ' + this.shoppingListItems.slice())
  //     }
  //   );
  //   return this.shoppingListItems.slice();
  // }


  getShoppingListItems(){
    return this.restService.getShoppingListItems().pipe(
      tap(resp => this.shoppingListItems = resp)
    );
  }

  
  deleteAllItems(){
    this.restService.deleteAllShoppingListItems().subscribe(
      resp => {
        this.shoppingListItems = [];
        this.itemChanged.next(this.shoppingListItems.slice());
      }
    )
  }

  addItems(items: ShoppingListItem[]) {
    this.restService.saveShoppingListItems(items).subscribe(
      items => {
        this.shoppingListItems.push(...items);
        this.itemChanged.next(this.shoppingListItems.slice());
      }
    );
  }

  deleteItemsByRecipeName(recipeName: string){
    this.restService.deleteShoppingListItemsByRecipeName(recipeName).subscribe(
      resp => {
        this.shoppingListItems = this.shoppingListItems.filter(item => item.recipeName != recipeName);
        this.itemChanged.next(this.shoppingListItems.slice());
      }
    );
  }

  updateShoppingListItem(id: number, item: ShoppingListItem){
    this.restService.updateShoppingListitem(id, item).subscribe(
      updatedItem => {
        console.log("updated Item: " + JSON.stringify(updatedItem));
        let index = this.shoppingListItems.findIndex(item => item.id == id);
        console.log('update index: ' + index);
        this.shoppingListItems[index] = item;
        this.itemChanged.next(this.shoppingListItems.slice());
      }
    )
  }

  addShoppingListItem(item: ShoppingListItem){
    this.restService.addShoppingListitem(item).subscribe(
      savedItem => {
        this.shoppingListItems.push(savedItem);
        this.itemChanged.next(this.shoppingListItems.slice());
      }
    )
  }

  deleteShoppingListItem(id: number){
    this.restService.deleteShoppingListItem(id).subscribe(
      resp => {
        let index = this.shoppingListItems.findIndex(item => item.id == id);
        const deletedItem = this.shoppingListItems[index];
        this.shoppingListItems.splice(index, 1);
        this.itemChanged.next(this.shoppingListItems.slice());
      }
    );
  }

  private groupBy(key: string, array: any) {
      return array.reduce((acc, obj) => {
        const property = obj[key];
        acc[property] = acc[property] || [];
        acc[property].push(obj);
        return acc;
      }, {});
  }

  groupShoppingListItem(key: string, array: ShoppingListItem[]): ShoppingListItemDetails[] {
    let sortedItems: ShoppingListItemDetails[] = [];
    let sortedItemsRow = this.groupBy(key, array);
    for(let prop in sortedItemsRow){
      sortedItems.push(new ShoppingListItemDetails(prop, sortedItemsRow[prop]));
    }
    return sortedItems;
  }

  convertIngredientsToShoppingListItems(ingredients: Ingredient[], recipeName?: string): ShoppingListItem[]{
    let shoppingListItems: ShoppingListItem[] = [];
    let tempRecipeName = recipeName ? recipeName : null;
    shoppingListItems = ingredients.map(ingredient => {
      return new ShoppingListItem(null, ingredient.name, ingredient.amount, tempRecipeName);
    });
    return shoppingListItems;
  }

}
