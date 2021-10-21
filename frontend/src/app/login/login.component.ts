import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../user.model';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  error: string;
  isLogin = true;
  isSignUp = false;
  isResetPassword = false;
  sendingEmail = false;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router, private loginService: LoginService,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.message = this.data.message;
  }
  
  onSwitchMode() {
    this.error = null;
    this.isLogin = !this.isLogin;
    this.isSignUp = !this.isSignUp;
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
    if (err['status']) {
      if(err.status == '409'){
        this.error = 'Such e-mail already exists!';
      } else if (err.status == '404'){
        this.error = "No such e-mail. Please enter e-mail you used for registration";
      }
    };
    if (err['error'] && err.error['message']) {
      let message: string = err.error.message.toLowerCase();
      if (message.includes('bad credentials') || message.includes('cannot pass null or empty values to constructor')) {
        this.error = 'Invalid e-mail or password!';
      };
    };
  }

  onForgotPassword(){
    this.error = null;
    this.message = null;
    this.isResetPassword = true;
    this.isLogin = false;
    this.isSignUp = false;
  }

  onSendResetPasswordLink(email:string){
    this.sendingEmail = true;
    this.loginService.sendResetPasswordToken(email).subscribe(
      resp => {
        this.sendingEmail = false;
        this.error = null;
        this.message = "Reset password link was sent. Please check your email";
      },
      err => {
        this.sendingEmail = false;
        this.message = null;
        this.onHandleError(err);
      }
    )
  }

}
