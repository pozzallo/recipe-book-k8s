import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  error: string;
  message = 'Please enter new password!';

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private http: HttpClient, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const password = form.value.password;
    const rePassword = form.value.rePassword;
    try {
      console.log(password + " " + rePassword);
      this.http.post('api/user/password', {'password': password}).subscribe(
        resp => {
          // this.commonService.showInfo('Password was change successfully', '');
          this.message = 'Password was change successfully!';
        }
      )
   
    } catch (error) {
      if (error['name'] && error.name == 'InvalidCharacterError') {
        this.error = 'The email or password contains an invalid character. Must contain only Latin letters and numbers!'
      }
    }
  }

}
