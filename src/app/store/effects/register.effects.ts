import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LoginRegisterService } from '../../services/login-register.service';
import * as RegisterActions from '../actions/register.actions';

@Injectable()
export class RegisterEffects {
    @Effect()
    register$ = this.actions$.pipe(
      ofType(RegisterActions.register),
      mergeMap(action =>
        this.loginRegisterService.registerUser(action.user).pipe(
          map(res => RegisterActions.registerSuccess({accessToken : res})),
          catchError(error => of(RegisterActions.registerFailure({error})))
        )
      )
    );

  constructor(private actions$: Actions, private loginRegisterService: LoginRegisterService) {}
}
