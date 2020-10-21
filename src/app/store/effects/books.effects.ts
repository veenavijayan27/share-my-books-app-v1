import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { bookActionTypes } from '../actions/books.actions';
import { BooksService } from '../../services/books.service';

@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.loadBooks),
      concatMap(() => this.bookService.getBooks()),
      map(books => bookActionTypes.booksLoaded({books}))
    )
  );

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.loadBook),
      concatMap((action) => this.bookService.getBook(action.bookId)),
      map(book => bookActionTypes.bookLoaded({book: [book]}))
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.addBook),
      concatMap((action) => this.bookService.addBook(action.book)),
      tap(() => this.router.navigateByUrl('/home'))
    ),
    {dispatch: false}
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.deleteBook),
      concatMap((action) => this.bookService.deleteBook(action.bookId))
    ),
    {dispatch: false}
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.updateBook),
      concatMap((action) => this.bookService.updateBook(action.update.id, action.update.changes)),
      tap(() => this.router.navigateByUrl('/home'))
    ),
    {dispatch: false}
  );

  constructor(private bookService: BooksService, private actions$: Actions, private router: Router) {}
}
