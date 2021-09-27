import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListItem } from '../shopping-list-item.model';
import { ShoppingListItemService } from '../shopping-list-item.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editSubscription: Subscription;
  editMode = false;
  @ViewChild('f') editForm: NgForm;
  editItem: ShoppingListItem;
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListItemService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.selectedItem.subscribe(
      item => {
        this.editItem = item;
        this.editMode = true;
        this.initForm();
      }
    )
  }

  initForm(){
    this.editForm.setValue({
              'name': this.editItem.name,
              'amount': this.editItem.amount
            })
  }

  onSubmit(f: NgForm){
    const value = f.value;
    let item:  ShoppingListItem;
    if(this.editMode){
      item = new ShoppingListItem(this.editItem.id, value.name, value.amount, this.editItem.recipeName);
      this.shoppingListService.updateShoppingListItem(this.editItem.id, item);
    }else{
      item = new ShoppingListItem(null, value.name, value.amount);
      this.shoppingListService.addShoppingListItem(item);
    }
   this.onClear();
  }

  onClear(){
    this.editForm.reset();
    this.editMode = false;
    this.editItem = null;
  }

  onDelete(){
    this.shoppingListService.deleteShoppingListItem(this.editItem.id);
    this.onClear();
  }

  ngOnDestroy(){
     this.subscription.unsubscribe();
   }

}
