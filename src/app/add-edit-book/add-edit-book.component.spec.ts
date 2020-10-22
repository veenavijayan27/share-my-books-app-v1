import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AddEditBookComponent } from './add-edit-book.component';
import { HomeComponent } from '../home/home.component';
import { LoginRegisterComponent } from '../login-register/login-register.component';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';

describe('AddEditBookComponent', () => {
  let component: AddEditBookComponent;
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AddEditBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddEditBookComponent,
        HomeComponent,
        LoginRegisterComponent,
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
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AddEditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display button Add', () => {
    const buttonText = fixture.nativeElement.querySelector('.buttonPrimary');
    expect(buttonText.textContent).toBe('Add');
  });
});
