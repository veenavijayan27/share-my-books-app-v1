import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Book } from '../models/book';
import { NgForm } from '@angular/forms';
import { addBook, bookActionTypes, bookLoaded, loadBook } from '../store/actions/books.actions';
import { getBookDetails } from '../store/selectors/books.selector';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss'],
})
export class AddEditBookComponent implements OnInit {
  book = {} as Book;
  addBook = true;
  submitted = false;
  id: string;
  tempBook: Book[];

  constructor(
    private _store: Store,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    // Load book details for edit
    if (this.id) {
      this.addBook = false;
      this._store.dispatch(loadBook({ bookId: this.id }));
      this._store.select(getBookDetails).subscribe((response) => {
        this.tempBook = response;
        this.book = { ...this.tempBook[0] };
      });
    }
  }

  ngOnInit(): void {}

  // Add book details in server
  OnAddBook(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      this._store.dispatch(addBook({ book: this.book }));
    }
  }

  // Update book details in server
  OnUpdateBook(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      const update: Update<Book> = {
        id: this.book.id,
        changes: {
          ...this.book,
          ...form.value,
        },
      };
      this._store.dispatch(bookActionTypes.updateBook({ update }));
    }
  }
}
