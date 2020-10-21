import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
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
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  error: any;
  form: FormGroup;
  submitted = false;
  buttonText: string;
  username: string;
  heading: string;
  user: User;
  action: string;
  loginResponse: any;
  registerResponse: any;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store, private route: ActivatedRoute, private loginRegisterService: LoginRegisterService) {
    this.route.paramMap.subscribe((params) => {
      this.action = params.get('action');
      if (this.action === 'register'){ // If 'register' is clicked
        this.heading = 'Register';
        this.buttonText = 'Register';
        this.username = 'Email Id';
      }
      else{ // If login is clicked
        this.heading = 'Login';
        this.buttonText = 'Login';
        this.username = 'Username';
      }
    });
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(): any { return this.form.controls; }

  onSubmit(): void{
    this.submitted = true;
    const payload = { email: this.f.email.value, password: this.f.password.value};
    if (this.form.valid) {

      // Method called when register button is clicked
      if (this.action === 'register'){
        this.store.dispatch(RegisterActions.register({ user: payload}));
        this.store.select(register).subscribe( response => {
          this.registerResponse = response;
          if (this.registerResponse.register.token) {
              window.location.href = 'loginregister/login'; // Redirect to login page
          } else {
            if (this.registerResponse.register.message) {
              this.error = this.registerResponse.register.message.error; // Show error message
            }
          }
        });
      }
      // Method called when login button is clicked
      else if (this.action === 'login'){
        this.store.dispatch(login({ user: payload}));
        this.store.select(authSelector).subscribe(res =>  {
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
      this.loginRegisterService.setAccessToken(response.loginToken);
      this.router.navigateByUrl('/home'); // Redirect to home when login attempt successful
    } else {
        if (this.loginRegisterService.getAccessToken) {
          this.loginRegisterService.removeAccessToken();
        }
        this.error = response.message;
    }
  }


}
