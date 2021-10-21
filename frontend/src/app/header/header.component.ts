import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from '../user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser: User = null;
  currentUserSub: Subscription;

  constructor(private loginService: LoginService, private router: Router, 
              public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserSub = this.userService.currentUser.subscribe(
      user => this.currentUser = user
    );
  }

  login(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: "Login into account to manage recipes and shopping list."
    };
    // open mat dialog
    this.dialog.open(LoginComponent, dialogConfig);
  }

  logout(){
    this.loginService.logout().subscribe(
      resp => {
              this.userService.currentUser.next(null);
            },
      err => {
              this.userService.currentUser.next(null);
            }
    );
    this.router.navigateByUrl(`/recipes/all`);
  }

  changePassword(){
    this.dialog.open(ChangePasswordComponent);
  }

  ngOnDestroy(){
    this.currentUserSub.unsubscribe();
  }
}
