import { createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';

export interface AuthState {
  isAuthenticated: boolean;
  loginToken: null;
  message: string | null;
}

// set initial state
export const initialState: AuthState = {
  isAuthenticated : false,
  loginToken : null,
  message : null,
};

export const userReducer = createReducer(
    initialState,
    // Login Reducer
    on(LoginActions.login, (state, action) => {
            return {
            ...state,
            isAuthenticated : false,
            loginToken : null,
            message: null
        };
    }),

    // On LoginSuccess
    on(LoginActions.loginSuccess, (state, action) => {
        return {
            ...state,
            isAuthenticated : true,
            loginToken : action.accessToken.accessToken,
            message : null
        };
    }),

    // On LoginFailure
    on(LoginActions.loginFailure, (state, action) => {
        return {
            ...state,
            isAuthenticated : false,
            loginToken : null,
            message : action.error,
        };
    }),

);

