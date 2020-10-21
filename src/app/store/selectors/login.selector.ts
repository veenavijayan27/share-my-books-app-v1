import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/login.reducer';

export const getAuthReferenceState = createFeatureSelector<AuthState>('user');

// Get Login state
export const authSelector = createSelector(getAuthReferenceState, state => state);
