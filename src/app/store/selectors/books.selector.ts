import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookState, selectAll } from '../reducers/books.reducer';

export const booksFeatureSelector = createFeatureSelector<BookState>('books');

// Get all books list
export const getAllBooksList = createSelector(booksFeatureSelector, selectAll);

// Get book details
export const getBookDetails = createSelector(booksFeatureSelector, selectAll);

// Get id of book
export const getCurrentBookId = createSelector(
  booksFeatureSelector,
  (state: BookState) => state.selectedBookId
);
