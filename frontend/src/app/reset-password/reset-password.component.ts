import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  error: string;

  constructor(private route: ActivatedRoute, private loginServise: LoginService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get("token");
    console.log("Token: " + this.token);
  }

  onSubmit(form: NgForm) {
    const password = form.value.password;
    try {
      this.loginServise.resetPassword(password, this.token).subscribe(
        resp => {
          let dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: "Login to your account using new password!"
          };
          this.dialog.open(LoginComponent, dialogConfig)
        }
      );
    } catch (error) {
      if (error['name'] && error.name == 'InvalidCharacterError') {
        this.error = 'The email or password contains an invalid character. Must contain only Latin letters and numbers!'
      }
    }
  }

}
