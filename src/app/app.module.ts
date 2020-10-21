import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ThemeService } from './services/theme.service';
import { AuthguardService } from './services/authguard.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { UserEffects } from './store/effects/login.effects';
import { userReducer } from './store/reducers/login.reducer';
import { RegisterEffects } from './store/effects/register.effects';
import { registerReducer } from './store/reducers/register.reducer';
import { BookEffects } from './store/effects/books.effects';
import { bookReducer } from './store/reducers/books.reducer';
import { LoginRegisterComponent } from './login-register/login-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEditBookComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forRoot({user: userReducer, register: registerReducer, books: bookReducer}),
    EffectsModule.forRoot([UserEffects, RegisterEffects, BookEffects]),
    HttpClientModule
  ],
  providers: [ ThemeService, AuthguardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
