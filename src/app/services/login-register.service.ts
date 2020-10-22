import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  registerUrl = environment.BASE_URL + 'register';
  loginUrl = environment.BASE_URL + 'login';

  constructor(private _http: HttpClient) {}

  // Set accesstoken to local storage
  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  // Get accesstoken from local storage
  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  // Remove accesstoken from local storage
  removeAccessToken(): void {
    localStorage.removeItem('accessToken');
  }

  // Http call to register a new user
  registerUser(user: User): any {
    return this._http.post(this.registerUrl, user)
    .pipe(map((data) => {
        return data;
      })
    );
  }

  // Http call to login an existing user
  loginUser(user: User): any {
    return this._http.post(this.loginUrl, user)
    .pipe(map((data) => {
        return data;
      })
    );
  }
}
