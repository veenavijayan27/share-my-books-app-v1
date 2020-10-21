import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ user }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{accessToken}>());

export const loginFailure = createAction('[Auth] Login Failure', props<{error}>());

