import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingListItem } from './shopping-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListRestService {
  private baseUrl = 'api/shoppingList';

  constructor(private http: HttpClient) { }

  getShoppingListItems(){
    return this.http.get(`${this.baseUrl}/items`) as Observable<ShoppingListItem[]>;
  }

  saveShoppingListItems(items: ShoppingListItem[]){
    return this.http.post(`${this.baseUrl}/items`, items) as Observable<ShoppingListItem[]>;
  }

  updateShoppingListitem(id: number, item: ShoppingListItem) {
    return this.http.put(`${this.baseUrl}/items/${id}`, item) as Observable<ShoppingListItem>;
  }

  addShoppingListitem(item: ShoppingListItem) {
    return this.http.post(`${this.baseUrl}/items/item`, item) as Observable<ShoppingListItem>;
  }

  deleteShoppingListItem(id: number){
    return this.http.delete(`${this.baseUrl}/items/${id}`) as Observable<any>;
  }

  deleteAllShoppingListItems(){
    return this.http.delete(`${this.baseUrl}/items/all`) as Observable<any>;
  }

  deleteShoppingListItemsByRecipeName(recipeName: string){
    return this.http.delete(`${this.baseUrl}/items/recipes/${recipeName}`) as Observable<any>;
  }
}
