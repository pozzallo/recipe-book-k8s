import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  logout(){
    this.http.post('/logout', null).subscribe(
      resp => {
        console.log('Logout responce');
        this.currentUser.next(null);
      },
      err => {
        console.log('Logout error responce');
        this.currentUser.next(null);
      }
    )
  };

  login(email: string, password: string){
    let headers = new HttpHeaders({authorization : 'Basic ' + btoa(email + ':' + password)});
    headers = headers.append("X-Requested-With", "XMLHttpRequest");
   return this.http.get<string>('/basic', {headers: headers, withCredentials: true}) as Observable<string>;
  }

  signup(name:string, email:string, password:string){
    let newUser = new User(null, name, email, null, password, null, null);
    return this.http.post('api/user', newUser) as Observable<User>;
  }


}
