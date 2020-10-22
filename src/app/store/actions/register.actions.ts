import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const register = createAction('[Auth] Register', props<{ user: User }>());

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ accessToken: any }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);
