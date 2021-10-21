import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // currentUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  // logout(){
  //   this.http.post('/logout', null).subscribe(
  //     resp => {
  //       this.currentUser.next(null);
  //     },
  //     err => {
  //       this.currentUser.next(null);
  //     }
  //   )
  // };
  logout(){
      return this.http.post('/logout', null) as Observable<any>;
  }


  login(email: string, password: string){
    let headers = new HttpHeaders({authorization : 'Basic ' + btoa(email + ':' + password)});
    headers = headers.append("X-Requested-With", "XMLHttpRequest");
    return this.http.get<string>('/basic', {headers: headers, withCredentials: true}) as Observable<string>;
  }

  signup(name:string, email:string, password:string){
    let newUser = new User(null, name, email, null, password, null, null);
    return this.http.post('api/user', newUser) as Observable<User>;
  }

  sendResetPasswordToken(email:string) {
    return this.http.post('api/user/sendResetPasswordToken', email);
  }

  resetPassword(newPassword: string, token: string){
    return this.http.post('api/user/resetPassword', {'password': newPassword, 'token': token});
  }


}
