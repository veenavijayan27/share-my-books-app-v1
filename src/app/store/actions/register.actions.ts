import { createAction, props } from '@ngrx/store';

export const register = createAction('[Auth] Register', props<{ user }>());

export const registerSuccess = createAction('[Auth] Register Success', props<{accessToken}>());

export const registerFailure = createAction('[Auth] Register Failure', props<{error}>());
