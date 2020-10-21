import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  public accessToken: string;


  constructor(private router: Router) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  // Redirect to login page if not logged in
  canActivate(): boolean  {
    if (!this.accessToken) {
      this.router.navigateByUrl('/loginregister/login');
    }
    return true;
  }

}
