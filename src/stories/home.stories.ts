import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../app/home/home.component';
import { AddEditBookComponent } from '../app/add-edit-book/add-edit-book.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BooksService } from '../app/services/books.service';

export default {
    title: 'Home component',
    component: HomeComponent,
} as Meta;

const booksList = [
    {
        id: 1,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        desc: 'A Novel',
        category: 'Fiction'
    },
    {
        id: 2,
        title: 'The Secret',
        author: 'Rhonde Byrne',
        desc: 'A motivational book',
        category: 'Motivational'
    }
];

const Template: Story<HomeComponent> = (args: HomeComponent) => ({
    component: HomeComponent,
    templateUrl: '../app/home/home.component.html',
    styleUrls: ['../app/home/home.component.scss'],
    moduleMetadata: {
        declarations: [HomeComponent, AddEditBookComponent],
        imports: [
          CommonModule,
          HttpClientModule,
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule
        ],
        providers: [BooksService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    },
    props: args,
});

export const LoggedInUser = Template.bind({});
LoggedInUser.args = {
    isLoggedIn: true,
    books$: booksList
};
export const GuestUser = Template.bind({});
GuestUser.args = {
    isLoggedIn: false,
    books$: booksList
};


