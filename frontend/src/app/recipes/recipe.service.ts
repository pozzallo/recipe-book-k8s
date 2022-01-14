import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { RecipeRestService } from './recipe-rest.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new BehaviorSubject<Recipe[]>([]);
  recipes: Recipe[] = [];
  recipeChanged = new Subject<Recipe>();

  constructor(private recipeRestService: RecipeRestService, private http: HttpClient) { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
   return this.recipeRestService.getRecipes().pipe(
     tap(resp => this.recipes = resp)
   );
  }

  getRecipe(id: string){
    return this.recipeRestService.getRecipe(id);
  }

  addRecipe(recipe: Recipe){
    this.recipeRestService.saveRecipe(recipe).subscribe(
      (resp: Recipe) => {
        this.recipes.push(resp);
        this.recipesChanged.next(this.recipes.slice());
      } 
    )
  }

  updateRecipe(recipeId: string, recipe: Recipe){
    this.recipeRestService.updateRecipe(recipeId, recipe).subscribe(
      respRecipe => {
        let index = this.recipes.findIndex(item => item.id == recipeId);
        this.recipes[index] = respRecipe;
        this.recipesChanged.next(this.recipes.slice());
        this.recipeChanged.next(respRecipe);
      } 
    );
  }

  deleteRecipe(id: string){
    this.recipeRestService.deleteRecipe(id).subscribe(
      resp => {
        let index = this.recipes.findIndex(item => item.id == id);
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
    );
  }

  addToMyRecipes(recipe: Recipe ){
    return this.recipeRestService.addToMyRecipes(recipe);
  }

  shareRecipe(id: string) {
   return this.recipeRestService.shareRecipe(id);
  }

  approveRecipe(recipe: Recipe) {
    return this.recipeRestService.approveRecipe(recipe);
  }

  filterRecipes(recipes: Recipe[], mode: string): Recipe[]{
   let filteredRecipes: Recipe[] = [];
    if(mode == 'all'){
      filteredRecipes = recipes.filter(recipe => !recipe.user);
    }else if (mode == 'my'){
      filteredRecipes = recipes.filter(recipe => (recipe.user && !recipe.pendingToApprove));
    }else if(mode == 'pending'){
      filteredRecipes = recipes.filter(recipe => recipe.pendingToApprove);
    }
    return filteredRecipes;
  }





}
