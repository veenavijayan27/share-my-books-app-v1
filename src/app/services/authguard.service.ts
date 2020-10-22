import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  public accessToken: string;

  constructor(private _router: Router) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  // Redirect to login page if not logged in
  canActivate(): boolean {
    if (!this.accessToken) {
      this._router.navigateByUrl('/login-register/login');
    }
    return true;
  }
}
