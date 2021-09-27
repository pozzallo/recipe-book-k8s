import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser: User = null;
  currentUserSub: Subscription;

  constructor(private loginService: LoginService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUserSub = this.loginService.currentUser.subscribe(
      user => this.currentUser = user
    );
  }

  login(){
    // open mat dialog
    this.dialog.open(LoginComponent);
  }

  logout(){
    this.loginService.logout();
    this.router.navigateByUrl(`/recipes/all`);
  }

  changePassword(){
    this.dialog.open(ChangePasswordComponent);
  }

  ngOnDestroy(){
    this.currentUserSub.unsubscribe();
  }
}
