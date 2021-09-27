import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RecipeRestService } from 'src/app/recipes/recipe-rest.service';
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
      if(this.mode == 'all'){
        this.recipes = recipes.filter(recipe => (!recipe.user && !recipe.pendingToApprove));
      }else if (this.mode == 'my'){
        this.recipes = recipes.filter(recipe => (recipe.user && !recipe.pendingToApprove));
      }else if(this.mode == 'pending'){
        this.recipes = recipes.filter(recipe => recipe.pendingToApprove);
      }
    })

    this.recipesChangedSub = this.recipeService.recipesChanged.subscribe(
      recipes => {
        if(this.mode == 'all'){
          this.recipes = recipes.filter(recipe => !recipe.user);
        }else if (this.mode == 'my'){
          this.recipes = recipes.filter(recipe => (recipe.user && !recipe.pendingToApprove));
        }else if(this.mode == 'pending'){
          this.recipes = recipes.filter(recipe => recipe.pendingToApprove);
        }
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
