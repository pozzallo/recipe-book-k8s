import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ShoppingListItemDetails } from './shopping-list-item-details.model';
import { ShoppingListItem } from './shopping-list-item.model';
import { ShoppingListItemService } from './shopping-list-item.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListItemService ) { }

  ngOnInit(): void {
 
  }

  }




