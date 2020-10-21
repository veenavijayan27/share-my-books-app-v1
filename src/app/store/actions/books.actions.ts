import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Book } from '../../models/book';

export const loadBooks = createAction(
'[Books List] Load Books List via Service',
);

export const booksLoaded = createAction(
  '[Books Effect] Books Loaded Successfully',
  props<{books: Book[]}>()
);
export const loadBook = createAction(
  '[Book List] Load Book via Service',
  props<{bookId: string | number}>()
  );

export const bookLoaded = createAction(
  '[Book Effect] Book Loaded Successfully',
  props<{book: Book[]}>()
);

export const addBook = createAction(
  '[Add Book Component] Add Book',
  props<{book: Book}>()
);

export const deleteBook = createAction(
  '[Books List Operations] Delete Book',
  props<{bookId: number}>()
);

export const updateBook = createAction(
  '[Books List Operations] Update Book',
  props<{update: Update<Book>}>()
);

export const bookActionTypes = {
  loadBooks,
  booksLoaded,
  loadBook,
  bookLoaded,
  addBook,
  updateBook,
  deleteBook
};
