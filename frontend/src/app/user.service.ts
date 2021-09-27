import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'api/users';

  constructor(private http: HttpClient) { }


}
