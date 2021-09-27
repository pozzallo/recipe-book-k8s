import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public dialog: MatDialog) { }
  
  showInfo(title: string, content: string){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: title,
      message: content
    };
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

}
