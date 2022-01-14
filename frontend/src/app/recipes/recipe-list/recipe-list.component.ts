import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  myRecipes: Recipe[];
  recipesChangedSub: Subscription;
  mode: string = 'all'

  searchText: string;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.mode = params.get('mode');
        return this.recipeService.getRecipes();
      })
    ).subscribe((recipes: Recipe[]) => {
      this.recipes = this.recipeService.filterRecipes(recipes, this.mode)
    });

    this.recipesChangedSub = this.recipeService.recipesChanged.subscribe(
      recipes => {
       this.recipes = this.recipeService.filterRecipes(recipes, this.mode)
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.recipesChangedSub.unsubscribe();
  }




}
