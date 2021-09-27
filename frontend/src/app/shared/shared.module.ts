import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinerComponent } from "./loading-spiner/loading-spiner.component";
import { PlaceholderDirective } from "./placeholder.directive";
import { SearchComponent } from "./search/search.component";
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from "@angular/forms";
import { FilterPipe } from "./filter.pipe";
import { TestPipe } from "./test.pipe";
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import {A11yModule} from '@angular/cdk/a11y';
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    declarations: [
        LoadingSpinerComponent,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        SearchComponent,
        FilterPipe,
        TestPipe,
        ConfirmDialogComponent,
        InfoDialogComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        A11yModule,
        MatMenuModule
    ],
    exports: [
        CommonModule,
        LoadingSpinerComponent,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        SearchComponent,
        FilterPipe,
        TestPipe,
        ConfirmDialogComponent,
        InfoDialogComponent,
        MatDialogModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        A11yModule
    ]
})
export class SharedModule{}