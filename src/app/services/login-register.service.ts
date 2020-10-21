import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  registerUrl = environment.baseUrl + 'register';
  loginUrl = environment.baseUrl + 'login';

  constructor(private http: HttpClient) { }

  // Set accesstoken to local storage
  setAccessToken(token): void{
    localStorage.setItem('accessToken', token);
  }

  // Get accesstoken from local storage
  getAccessToken(): any{
    return localStorage.getItem('accessToken');
  }

  // Remove accesstoken from local storage
  removeAccessToken(): void{
    localStorage.removeItem('accessToken');
  }

  // Http call to register a new user
  registerUser(user): any {
    return this.http.post(this.registerUrl, user)
     .pipe(map(data => {
         return data;
     }));
   }

   // Http call to login an existing user
  loginUser(user): any {
    return this.http.post(this.loginUrl, user)
    .pipe(map(data => {
        return data;
    }));
  }

}
