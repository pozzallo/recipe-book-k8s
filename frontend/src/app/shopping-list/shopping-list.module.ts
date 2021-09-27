import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';
import { SelectedRecipesListComponent } from './selected-recipes-list/selected-recipes-list.component';
import { RecipeResolverService } from "./recipes-resolver.service";
import { A11yModule } from "@angular/cdk/a11y";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

const routes: Routes = [
    {path: '', component: ShoppingListComponent,
        children: [
            {path: '', component: ShoppingListItemComponent, pathMatch: 'full'},
            {path: 'items', component: ShoppingListItemComponent},
            {path: 'recipes', component: SelectedRecipesListComponent, resolve: {recipes: RecipeResolverService}}
        ]        
}
]

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
        ShoppingListItemComponent,
        SelectedRecipesListComponent
    ],
    imports: [ 
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
        MatDialogModule,
        MatButtonModule,
        A11yModule

        // RouterModule.forChild([{path: '', component: ShoppingListComponent}])
    ]
    
})
export class ShoppingListModule{}