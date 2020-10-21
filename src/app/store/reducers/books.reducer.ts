import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../../models/book';
import { bookActionTypes } from '../actions/books.actions';

export interface BookState extends EntityState<Book> {
  booksLoaded: boolean;
  selectedBookId: number;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

// set book inital state
export const initialState = adapter.getInitialState({
  booksLoaded: false,
  selectedBookId: null
});

export const bookReducer = createReducer(
  initialState,

  // books loaded reducer
  on(bookActionTypes.booksLoaded, (state, action) => {
    return adapter.setAll(
      action.books,
      {...state, booksLoaded: true}
    );
  }),

  // book loaded reducer
  on(bookActionTypes.bookLoaded, (state, action) => {
    return adapter.setAll(
      action.book,
      {...state, bookLoaded: true}
    );
  }),

  // add book reducer
  on(bookActionTypes.addBook, (state, action) => {
    return adapter.addOne(action.book, state);
  }),

  // delete book reducer
  on(bookActionTypes.deleteBook, (state, action) => {
    return adapter.removeOne(action.bookId, state);
  }),

  // update book reducer
  on(bookActionTypes.updateBook, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectEntities } = adapter.getSelectors();
