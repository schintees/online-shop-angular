import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "../services/cart.service";
import { createOrder, createOrderError, createOrderSuccess } from "./cart.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Messages } from "../../shared/types/messages.const";

@Injectable()
export class ShoppingCartEffects {

    constructor(
        private actions$: Actions,
        private cartService: CartService,
        private snackBarService: SnackbarService
    ) { }

    createOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createOrder),
            exhaustMap(({ cartProducts }) => this.cartService.createOrder(cartProducts)
                .pipe(
                    map(() => createOrderSuccess()),
                    catchError((error) => of(createOrderError({ error })))
                )
            )
        )
    );

    createOrderSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createOrderSuccess),
            tap(() => {
                this.snackBarService.openSuccessMessageBar(Messages.cart.orderCreatedSuccessfully)
            })
        ), { dispatch: false }
    );

}