import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LoginRegisterService } from '../../services/login-register.service';
import * as LoginActions from '../actions/login.actions';

@Injectable()
export class UserEffects {
    @Effect()
    login$ = this.actions$.pipe(
      ofType(LoginActions.login),
      mergeMap(action =>
        this.loginRegisterService.loginUser(action.user).pipe(
          map(res => LoginActions.loginSuccess({accessToken : res})),
          catchError(error => of(LoginActions.loginFailure({error})))
        )
      )
    );

  constructor(private actions$: Actions, private loginRegisterService: LoginRegisterService) {}
}
