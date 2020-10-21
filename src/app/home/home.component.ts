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

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(bookActionTypes.loadBooks()); // dispatch load books actions
    this.store.select(getAllBooksList).subscribe(result =>  this.books$ = result); // get books list
    this.store.select(authSelector).subscribe(state => {
      if (state) {
        this.isLoggedIn = state.isAuthenticated;
      }
    });
  }

  // Delete a book
  deleteBook(bookId: number): void{
    this.store.dispatch(bookActionTypes.deleteBook({bookId}));
  }

}
