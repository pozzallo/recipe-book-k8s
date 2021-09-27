import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message = 'Login to your account to manage your recipe and shopping list.';
  error: string;
  isLogin = true;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }
  
  onSwitchMode() {
    this.error = null;
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    try {
      if (this.isLogin) {
        // do log in
        this.onLogin(email, password);
      } else {
        // do sign up
        const name = form.value.name;
        this.onSignup(name, email, password);
      }
    } catch (error) {
      if (error['name'] && error.name == 'InvalidCharacterError') {
        this.error = 'The email or password contains an invalid character. Must contain only Latin letters and numbers!'
      }
    }
  }

  onLogin(email: string, password: string) {
    this.loginService.login(email, password).subscribe(
      resp => {
        this.successLogin();
      },
      err => {
        this.onHandleError(err);
      }
    );
  }

  onSignup(name: string, email: string, password: string) {
    this.loginService.signup(name, email, password).subscribe(
      (resp: User) => {
        this.error = null;
        this.message = `Welcome ${resp.name} ! \n` + this.message;
        this.onSwitchMode();
      },
      err => {
        this.onHandleError(err);
      }
    );
  }

  successLogin() {
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }

  onHandleError(err: any) {
    this.error = 'Unexpected server error occured! Please try again later.';
    if (err['status'] && err.status == '409') {
      this.error = 'Conflict! Such e-mail already exists!';
    } else if (err['error'] && err.error['message']) {
      let message: string = err.error.message.toLowerCase();
      if (message.includes('bad credentials')) {
        this.error = 'Invalid e-mail or password!';
      };
      if (message.includes('cannot pass null or empty values to constructor')) {
        this.error = 'This e-mail is already in use for ';
      }
    };
  }

}
