import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../services/cart.service';
import {
  createOrder,
  createOrderError,
  createOrderSuccess,
} from './cart.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { SnackbarMessages } from '../../shared/types/snackbar-messages.enum';
import { SnackbarService } from '../../../services/snackbar.service';

@Injectable()
export class ShoppingCartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private snackBarService: SnackbarService
  ) {}

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrder),
      exhaustMap(({ cartProducts }) =>
        this.cartService.createOrder(cartProducts).pipe(
          map(() => createOrderSuccess()),
          catchError((error) => of(createOrderError({ error })))
        )
      )
    )
  );

  createOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createOrderSuccess),
        tap(() => {
          this.snackBarService.openSuccessMessageBar(
            SnackbarMessages.orderCreatedSuccessfully
          );
        })
      ),
    { dispatch: false }
  );
}
