import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegisterComponent } from './login-register.component';
import { HomeComponent } from '../home/home.component';
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';
import * as loginReducers from '../store/reducers/login.reducer';
import { userReducer } from '../store/reducers/login.reducer';
import { User } from '../models/User';
import { login } from '../store/actions/login.actions';
import { registerReducer } from '../store/reducers/register.reducer';
import * as registerReducers from '../store/reducers/register.reducer';
import { register } from '../store/actions/register.actions';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginRegisterComponent,
        HomeComponent,
        AddEditBookComponent,
      ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
      ],
      providers: [
        provideMockStore(),
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain', () => {
    expect(component).toBeTruthy();
  });

  it('should display header Login', () => {
    component.action = 'login';
    const header = fixture.nativeElement.querySelector('#loginRegTitle');
    expect(header.textContent).toBe('Login');
  });

  it('should display button text Login', () => {
    component.action = 'login';
    const button = fixture.nativeElement.querySelector('#authButton');
    expect(button.textContent).toBe('Login');
  });

  describe('login payload', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = userReducer(undefined, action);
      expect(result).toEqual(loginReducers.initialState);
    });
    it('should fail login', () => {
      const user = { email: 'invalid email', password: 'pwd' } as User;
      const createAction = login({ user });
      const expectedResult = loginReducers.initialState;
      const result = userReducer(loginReducers.initialState, createAction);
      expect(result).toEqual(expectedResult);
    });
    it('should match login expected state', () => {
      const user = { email: 'veena@gmail.com', password: '12345' } as User;
      const createAction = login({ user });
      const loginResult = userReducer(loginReducers.initialState, createAction);

      const expectedResult = {
        isAuthenticated: false,
        loginToken: null,
        message: null,
      };
      expect(loginResult).toEqual(expectedResult);
    });
  });

  describe('duplicate register  payload', () => {
    it('should NOT register a user', () => {
      const user = {
        email: 'veena@gmail.com',
        password: 'abcd',
      } as User;
      const createAction = register({ user });
      const result = registerReducer(
        registerReducers.initialState,
        createAction
      );
      const expectedResult = {
        isRegistered: false,
        token: null,
        message: null,
        user: result.user,
      };
      expect(result).toEqual(expectedResult);
    });
  });
});
