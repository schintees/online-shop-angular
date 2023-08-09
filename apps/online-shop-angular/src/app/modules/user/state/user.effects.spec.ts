import { Observable, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { login, loginError, loginSuccess } from './user.actions';
import { UserCredentials } from '../types/user.credentials.types';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user.types';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarMessages } from '../../shared/types/snackbar-messages.enum';
import { SnackbarService } from '../../../services/snackbar.service';
import { NavigationService } from '../../../services/navigation.service';

describe('User Effects', () => {
  let effects: UserEffects;
  let actions$ = new Observable<Action>();
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;

  const user: User = {
    username: 'doej',
    fullName: 'John Doe',
    roles: ['user', 'customer'],
  };

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', [
      'navigateToProductsPage',
    ]);
    snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', [
      'openErrorMessageBar',
    ]);

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        UserEffects,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(UserEffects);
  });

  describe('login action', () => {
    it('should dispatch loginSuccess', () => {
      authServiceSpy.login.and.returnValue(of(user));

      const userCredentials: UserCredentials = {
        username: 'doej',
        password: 'password',
      };
      actions$ = of(login({ userCredentials }));

      effects.login$.subscribe((action) => {
        expect(action).toEqual(loginSuccess({ user }));
      });
    });

    it('should dispatch loginError', () => {
      const httpErrorResponse = new HttpErrorResponse({
        error: {
          message: 'Not Found',
          statusCode: 404,
        },
        url: '',
        status: 404,
        statusText: 'Not Found',
      });
      authServiceSpy.login.and.returnValue(throwError(() => httpErrorResponse));

      const userCredentials: UserCredentials = {
        username: 'doej',
        password: 'password',
      };
      actions$ = of(login({ userCredentials }));

      effects.login$.subscribe((action) => {
        expect(action).toEqual(
          loginError({ error: JSON.stringify(httpErrorResponse) })
        );
      });
    });
  });

  describe('loginSuccess action', () => {
    it('should navigate to the products page', () => {
      actions$ = of(loginSuccess({ user }));
      effects.loginSuccess$.subscribe();

      expect(navigationServiceSpy.navigateToProductsPage).toHaveBeenCalledTimes(
        1
      );
    });
  });

  describe('loginError action', () => {
    it('should show wrong credentials ', () => {
      const httpErrorResponse = new HttpErrorResponse({
        error: {
          message: 'Not Found',
          statusCode: 404,
        },
        url: '',
        status: 404,
        statusText: 'Not Found',
      });

      actions$ = of(loginError({ error: JSON.stringify(httpErrorResponse) }));
      effects.loginError$.subscribe();

      expect(snackbarServiceSpy.openErrorMessageBar).toHaveBeenCalledOnceWith(
        SnackbarMessages.wrongCredentials
      );
    });

    it('should show server error ', () => {
      const errorResponse = new HttpErrorResponse({
        url: '',
        status: 0,
        statusText: 'Unknown Error',
      });

      actions$ = of(loginError({ error: JSON.stringify(errorResponse) }));
      effects.loginError$.subscribe();

      expect(snackbarServiceSpy.openErrorMessageBar).toHaveBeenCalledOnceWith(
        SnackbarMessages.serverError
      );
    });
  });
});
