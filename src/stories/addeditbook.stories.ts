import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AddEditBookComponent } from '../app/add-edit-book/add-edit-book.component';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from '../app/services/books.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const bookList = {
    id: 1,
    title: 'The Secret',
    author: 'Rhonde Byrne',
    desc: 'A motivational book',
    category: 'Motivational'
};

export default {
    title: 'Add Edit component',
    component: AddEditBookComponent,
} as Meta;

const Template: Story<AddEditBookComponent> = (args: AddEditBookComponent) => ({
    component: AddEditBookComponent,
    moduleMetadata: {
        declarations: [AddEditBookComponent],
        imports: [
          CommonModule,
          HttpClientModule,
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
          StoreModule.forRoot({}),
          EffectsModule.forRoot([])
        ],
        providers: [BooksService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    },
    props: args
});

export const add = Template.bind({});
add.args = {};

export const edit = Template.bind({});

edit.args = {
    id: '1',
    book: bookList,
    addBook: false
};



