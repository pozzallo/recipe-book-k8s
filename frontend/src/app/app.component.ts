import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recipe-book';

  constructor(private http: HttpClient, private userService: UserService){}

  ngOnInit(){
    this.http.get<User>("api/user").subscribe(
      (userResp: User) => {
        if(userResp){
          let currenrUser = new User(userResp.id,
                                      userResp.name,
                                      userResp.email,
                                      userResp.googleSub,
                                      userResp.password,
                                      userResp.enabled,
                                      userResp.authorities);
          this.userService.currentUser.next(currenrUser);
        }
      }
    );
  }


  

}
