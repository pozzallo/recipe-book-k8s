import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ShoppingListItemDetails } from '../shopping-list-item-details.model';
import { ShoppingListItem } from '../shopping-list-item.model';
import { ShoppingListItemService } from '../shopping-list-item.service';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit, OnDestroy {
  shoppingListItems: ShoppingListItem[];
  itemChangeSub: Subscription;
  editItem: ShoppingListItem = null;
  sortedItemsSummary: ShoppingListItemDetails[] = [];
  sortedItemsDetails: ShoppingListItemDetails[] = [];
  isShowSummary = false;

  constructor(private shoppingListService: ShoppingListItemService, public dialog: MatDialog, private commonService: CommonService) { }

  ngOnInit(): void {
    this.shoppingListService.getShoppingListItems().subscribe(
      resp => {
        this.shoppingListItems = resp;
        this.sortedItemsDetails = this.shoppingListService.groupShoppingListItem('recipeName', this.shoppingListItems);
        this.sortedItemsSummary = this.shoppingListService.groupShoppingListItem('name', this.shoppingListItems);
      },
      error => {
        if(error.status == '404'){
          this.commonService.showInfo('Shopping List is empty!','You can create a new shopping list item or add it from the Recipe');
        }
      }
    );
    this.itemChangeSub = this.shoppingListService.itemChanged.subscribe(
      (items: ShoppingListItem[]) => {
        this.shoppingListItems = items;
        this.sortedItemsDetails = this.shoppingListService.groupShoppingListItem('recipeName', this.shoppingListItems);
        this.sortedItemsSummary = this.shoppingListService.groupShoppingListItem('name', this.shoppingListItems);
      }
    );
  }

  showSummary(){
    this.isShowSummary = !this.isShowSummary;
  }

  onEditItem(item: ShoppingListItem){
    this.editItem = item;
    this.shoppingListService.selectedItem.next(item);
  }

  ngOnDestroy(): void {
    this.itemChangeSub.unsubscribe();
  }

  onClearShoppingList(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete all elements?',
      message: 'This will delete all elements that are currently on this page and cannot be undone.'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.shoppingListService.deleteAllItems();
      }
    });
  }

}
