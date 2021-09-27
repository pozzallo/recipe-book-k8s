import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Authority } from 'src/app/authority.model';
import { LoginService } from 'src/app/login.service';
import { CommonService } from 'src/app/shared/common.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListItem } from 'src/app/shopping-list/shopping-list-item.model';
import { ShoppingListItemService } from 'src/app/shopping-list/shopping-list-item.service';
import { User } from 'src/app/user.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  id: string;
  recipeChangedSub: Subscription;
  userSub: Subscription;
  recipeLoaded = false;
  currentUser: User = null;
  mode = 'all';
  isAdmin: boolean;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router,
    private shoppingListService: ShoppingListItemService, private loginService: LoginService, public dialog: MatDialog,
    private commonService: CommonService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => this.mode = params.get('mode'));
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this.recipeService.getRecipe(params.get('id'));
      })
    ).subscribe(
      result => {
        this.recipe = result;
        this.recipeLoaded = true;
      },
      error => {
        console.log('Error on fetching data: ', error);
      }
    );
    this.userSub = this.loginService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.isAdmin = this.currentUser.isAdmin();
      });
    this.recipeChangedSub = this.recipeService.recipeChanged.subscribe(recipe => this.recipe = recipe);
  }

  onAddToShoppingList() {
    let items: ShoppingListItem[];
    items = this.shoppingListService.convertIngredientsToShoppingListItems(this.recipe.ingredients, this.recipe.name);
    this.shoppingListService.addItems(items);
  }

  onAddToMyRecipe() {
    let ingredients: Ingredient[] = this.recipe.ingredients.slice();
    let myRecipe = new Recipe(null,
      this.recipe.name,
      this.recipe.imageUrl,
      this.recipe.description,
      ingredients,
      this.currentUser);
    this.recipeService.addToMyRecipes(myRecipe).subscribe(
      recipeResp => {
        this.commonService.showInfo(`Recipe: '${myRecipe.name}' was added!`, `Go to 'My Recipes' to manage all your recipes.`)
      }
    )
  }

  onDelete() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete this Recipe?',
      message: `This will delete Recipe: '${this.recipe.name}' and cannot be undone.`
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.deleteRecipe(this.recipe.id);
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  onShare() {
    this.recipeService.shareRecipe(this.recipe.id).subscribe(
      resp => {
        this.commonService.showInfo(`The recipe '${this.recipe.name}' has been sent for moderation.`, ` Will appear after approval. Thanks for sharing your recipe!`)
      }
    );
  }

  onApproveRecipe(){
    this.recipeService.approveRecipe(this.recipe).subscribe(
      resp => {
        this.commonService.showInfo(`The recipe '${this.recipe.name}' was added successfully!`, '');
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    )
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.recipeChangedSub.unsubscribe();
  }

}
