import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { login } from '../store/actions/login.actions';
import { authSelector } from '../store/selectors/login.selector';
import * as RegisterActions from '../store/actions/register.actions';
import { register } from '../store/actions/register.actions';
import { LoginRegisterService } from '../services/login-register.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  error: any;
  form: FormGroup;
  submitted = false;
  buttonText: string;
  username: string;
  heading: string;
  user: User;
  action = 'register';
  loginResponse: any;
  registerResponse: any;

  // tslint:disable-next-line: max-line-length
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _store: Store,
    private _route: ActivatedRoute,
    private _loginRegisterService: LoginRegisterService
  ) {
    this._route.paramMap.subscribe((params) => {
      this.action = params.get('action');
      if (this.action === 'register') {
        // If 'register' is clicked
        this.heading = 'Register';
        this.buttonText = 'Register';
        this.username = 'Email Id';
      } else {
        // If login is clicked
        this.heading = 'Login';
        this.buttonText = 'Login';
        this.username = 'Username';
      }
    });
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f(): any {
    return this.form.controls;
  }

  OnSubmit(): void {
    this.submitted = true;
    const payload = {
      email: this.f.email.value,
      password: this.f.password.value,
    };
    if (this.form.valid) {
      // Method called when register button is clicked
      if (this.action === 'register') {
        this._store.dispatch(RegisterActions.register({ user: payload }));
        this._store.select(register).subscribe((response) => {
          this.registerResponse = response;
          if (this.registerResponse.register.token) {
            window.location.href = 'login-register/login'; // Redirect to login page
          } else {
            if (this.registerResponse.register.message) {
              this.error = this.registerResponse.register.message.error; // Show error message
            }
          }
        });
      }
      // Method called when login button is clicked
      else if (this.action === 'login') {
        this._store.dispatch(login({ user: payload }));
        this._store.select(authSelector).subscribe((res) => {
          if (res) {
            this.loginResponse = res;
            this.navigate(res);
          }
        });
      }
    }
  }

  navigate(response: any): void {
    if (response.loginToken) {
      this._loginRegisterService.setAccessToken(response.loginToken);
      this._router.navigateByUrl('/home'); // Redirect to home when login attempt successful
    } else {
      if (this._loginRegisterService.getAccessToken) {
        this._loginRegisterService.removeAccessToken();
      }
      this.error = response.message;
    }
  }
}
