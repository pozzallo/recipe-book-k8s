import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { RecipesComponent } from "./recipes/recipes.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";


const appRoutes: Routes = [
    {path: '', redirectTo: 'recipes/all', pathMatch: 'full'},
    {path: 'reset-password', component: ResetPasswordComponent, pathMatch: 'full'},
    {path: 'change-password', component: ChangePasswordComponent, pathMatch: 'full'},
    {
      path: 'recipes/:mode', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
    },
    {
      path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule{

}