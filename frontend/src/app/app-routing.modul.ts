import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";


const appRoutes: Routes = [
    {path: '', redirectTo: 'recipes/all', pathMatch: 'full'},
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