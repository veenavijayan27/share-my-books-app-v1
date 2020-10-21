import { createReducer, on } from '@ngrx/store';
import * as RegisterActions from '../actions/register.actions';
import { User } from '../../models/user';

export interface RegisterState {
  isRegistered: boolean;
  user: User | null;
  token: string | null;
  message: string | null;
}

// set initial register state
export const initialState: RegisterState = {
  isRegistered: false,
  user: null,
  token : null,
  message : null
};

export const registerReducer = createReducer(
    initialState,
    // Register reducer
    on(RegisterActions.register, (state, action) => {
            return {
            ...state,
            isRegistered : false,
            user : action.user,
            token : null,
            message : null
        };
    }),

    // RegisterSuccess reducer
    on(RegisterActions.registerSuccess, (state, action) => {
        return {
            ...state,
            isRegistered : true,
            user : null,
            token : action.accessToken.accessToken,
            message : null,
        };
    }),

    // RegisterFailuer reducer
    on(RegisterActions.registerFailure, (state, action) => {
        return {
            ...state,
            isRegistered : false,
            user : null,
            token : null,
            message : action.error,
        };
    })
);
