import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { bookActionTypes } from '../actions/books.actions';
import { BooksService } from '../../services/books.service';

@Injectable()
export class BookEffects {
  loadBooks$ = createEffect(() =>
    this._actions$.pipe(
      ofType(bookActionTypes.loadBooks),
      concatMap(() => this._bookService.getBooks()),
      map((books) => bookActionTypes.booksLoaded({ books }))
    )
  );

  loadBook$ = createEffect(() =>
    this._actions$.pipe(
      ofType(bookActionTypes.loadBook),
      concatMap((action) => this._bookService.getBook(action.bookId)),
      map((book) => bookActionTypes.bookLoaded({ book: [book] }))
    )
  );

  addBook$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(bookActionTypes.addBook),
        concatMap((action) => this._bookService.addBook(action.book)),
        tap(() => this._router.navigateByUrl('/home'))
      ),
    { dispatch: false }
  );

  deleteBook$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(bookActionTypes.deleteBook),
        concatMap((action) => this._bookService.deleteBook(action.bookId))
      ),
    { dispatch: false }
  );

  updateBook$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(bookActionTypes.updateBook),
        concatMap((action) =>
          this._bookService.updateBook(action.update.id, action.update.changes)
        ),
        tap(() => this._router.navigateByUrl('/home'))
      ),
    { dispatch: false }
  );

  constructor(
    private _bookService: BooksService,
    private _actions$: Actions,
    private _router: Router
  ) {}
}
