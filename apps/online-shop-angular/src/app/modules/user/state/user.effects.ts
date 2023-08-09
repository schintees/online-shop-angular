import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { login, loginError, loginSuccess, logout } from './user.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { SnackbarMessages } from '../../shared/types/snackbar-messages.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../../services/snackbar.service';
import { NavigationService } from '../../../services/navigation.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private navigationService: NavigationService
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ userCredentials }) =>
        this.authService.login(userCredentials).pipe(
          map((user) => loginSuccess({ user })),
          catchError((error) =>
            of(loginError({ error: JSON.stringify(error) }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.navigationService.navigateToProductsPage();
        })
      ),
    { dispatch: false }
  );

  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginError),
        tap(({ error }) => {
          const httpError: HttpErrorResponse = JSON.parse(error);
          if (httpError && httpError.error && httpError.error.message) {
            this.snackBarService.openErrorMessageBar(
              SnackbarMessages.wrongCredentials
            );
          } else {
            this.snackBarService.openErrorMessageBar(
              SnackbarMessages.serverError
            );
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.logout();
          this.navigationService.navigateToLoginPage();
        })
      ),
    { dispatch: false }
  );
}
