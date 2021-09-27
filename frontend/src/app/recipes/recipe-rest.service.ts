import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { ShoppingListItem } from '../shopping-list/shopping-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeRestService {

  baseUrl = 'api/recipes';
  // baseUrl = 'http://localhost:8080/api/recipes';

  constructor(private http: HttpClient) { }

  getRecipes(){
    return this.http.get(this.baseUrl) as Observable<Recipe[]>;
  }

  saveRecipe(recipe: Recipe){
    return this.http.post(this.baseUrl, recipe) as Observable<Recipe>;
  }

  updateRecipe(id: string, recipe: Recipe) {
    return this.http.put(`${this.baseUrl}/${id}`, recipe ) as Observable<Recipe>;
  }

  getRecipe(id: string){
    return this.http.get(`${this.baseUrl}/${id}`) as Observable<Recipe>;
  }

  deleteRecipe(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`) as Observable<any>;
  }

  

}
