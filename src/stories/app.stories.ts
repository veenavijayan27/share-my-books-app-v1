import { AppComponent } from '../app/app.component';
import { moduleMetadata } from '@storybook/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { ThemeService } from '../app/services/theme.service';
import { AppRoutingModule } from '../app/app-routing.module';
import { UserEffects } from '../app/store/effects/login.effects';
import { userReducer } from '../app/store/reducers/login.reducer';
import { RegisterEffects } from '../app/store/effects/register.effects';
import { registerReducer } from '../app/store/reducers/register.reducer';
import { AddEditBookComponent } from '../app/add-edit-book/add-edit-book.component';
import { LoginRegisterComponent } from '../app/login-register/login-register.component';
import { HomeComponent } from '../app/home/home.component';
import { AuthGuardService } from '../app/services/authguard.service';
import { BookEffects } from '../app/store/effects/books.effects';
import { bookReducer } from '../app/store/reducers/books.reducer';

export default {
    title: 'App component',
    component: AppComponent,
} as Meta;

const Template: Story<AppComponent> = (args: AppComponent) => ({
    component: AppComponent,
    templateUrl: '../app/app.component.html',
    styleUrls: ['../app/app.component.scss'],
    moduleMetadata: {
        declarations: [
            AppComponent,
            HomeComponent,
            AddEditBookComponent,
            LoginRegisterComponent
        ],
        imports: [
            CommonModule,
            BrowserModule,
            AppRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            RouterModule.forRoot([], { useHash: true }),
            StoreModule.forRoot({user: userReducer, register: registerReducer, books: bookReducer}),
            EffectsModule.forRoot([UserEffects, RegisterEffects, BookEffects]),
            BrowserAnimationsModule
        ],
        providers: [
            { provide: APP_BASE_HREF, useValue: '/' },
            ThemeService,
            AuthGuardService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
    props: { args },
});

export const Default = Template.bind({});

Default.args = {
    isLoggedIn: false,
    title : 'Share My Books',
    switchTheme : new FormControl(false)
};

