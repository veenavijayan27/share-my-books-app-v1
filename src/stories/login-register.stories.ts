import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginRegisterComponent } from '../app/login-register/login-register.component';
import { HomeComponent } from '../app/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegisterService } from '../app/services/login-register.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

export default {
    title: 'Login Register component',
    component: LoginRegisterComponent,
} as Meta;

const Template: Story<LoginRegisterComponent> = (args: LoginRegisterComponent) => ({
    component: LoginRegisterComponent,
    moduleMetadata: {
        declarations: [LoginRegisterComponent, HomeComponent],
        imports: [
          CommonModule,
          HttpClientModule,
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
          StoreModule.forRoot({}),
          EffectsModule.forRoot([])
        ],
        providers: [LoginRegisterService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    },
    props: args
});

export const login = Template.bind({});
login.args = {
    action: 'login',
    heading : 'Login',
    buttonText : 'Login',
    username : 'Username'
};

export const register = Template.bind({});

register.args = {
    action: 'register',
    heading : 'Register',
    buttonText : 'Register',
    username : 'Email Id'
};



