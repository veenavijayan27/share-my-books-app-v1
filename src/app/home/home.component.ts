import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authSelector } from '../store/selectors/login.selector';
import { getAllBooksList } from '../store/selectors/books.selector';
import { bookActionTypes } from '../store/actions/books.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean;
  books$: any;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(bookActionTypes.loadBooks()); // dispatch load books actions
    this._store.select(getAllBooksList)
    .subscribe(result =>  this.books$ = result); // get books list
    this._store.select(authSelector)
    .subscribe(state => {
      if (state) {
        this.isLoggedIn = state.isAuthenticated;
      }
    });
  }

  // Delete a book
  OnDeleteBook(bookId: number): void{
    this._store.dispatch(bookActionTypes.deleteBook({bookId}));
  }

}
