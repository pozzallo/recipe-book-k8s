import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login.service';
import { User } from 'src/app/user.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  recipeId: string;
  editMode = false;
  recipeForm: FormGroup = null;
  recipe: Recipe;
  dataLoaded = false;
  currentUser: User;
  userSub: Subscription;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.userSub = this.loginService.currentUser.subscribe(user => this.currentUser = user);
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.editMode = this.recipeId != null;
    if(this.editMode){
      // get recipe by id and initForm
      this.recipeService.getRecipe(this.recipeId).subscribe(
        recipe => {
          this.recipe = recipe;
          this.initForm();
          this.dataLoaded = true;
        }
      )
    }else{
      this.initForm();
      this.dataLoaded = true;
    }
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    }else{
      let formValue = this.recipeForm.value;
      let recipe: Recipe = new Recipe(null, formValue.name, formValue.imageUrl, 
                                      formValue.description, formValue.ingredients, this.currentUser);
      this.recipeService.addRecipe(recipe);
    };
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route}); 
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
     recipeName = this.recipe.name;
     recipeImagePath = this.recipe.imageUrl;
     recipeDescription = this.recipe.description;
      if(this.recipe['ingredients']){
        for(let ingredient of this.recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required])
          }));
        }
      };
    };
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imageUrl': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
   (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
     'name': new FormControl(null, Validators.required),
     'amount': new FormControl(null, [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required])
   }));
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
