import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { addProduct, addProductError, addProductSuccess, deleteProduct, deleteProductError, deleteProductSuccess, loadProduct, loadProductError, loadProductSuccess, loadProducts, loadProductsError, loadProductsSuccess, updateProduct, updateProductError, updateProductSuccess } from "./product.actions";
import { NavigationService } from "src/app/services/navigation.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { SnackbarMessages } from "../../modules/shared/types/snackbar-messages.enum";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private navigationService: NavigationService,
        private snackBarService: SnackbarService,
        private matDialod: MatDialog
    ) { }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            exhaustMap(() => this.productService.getAllProducts()
                .pipe(
                    map((products) => loadProductsSuccess({ products })),
                    catchError((error) => of(loadProductsError({ error })))
                )
            )
        )
    );

    loadProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProduct),
            exhaustMap(({ productId }) => this.productService.getProduct(productId)
                .pipe(
                    map((product) => loadProductSuccess({ product })),
                    catchError((error) => of(loadProductError({ error })))
                )
            )
        )
    );

    addProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addProduct),
            exhaustMap(({ product }) => this.productService.addProduct(product)
                .pipe(
                    map((product) => addProductSuccess({ product })),
                    catchError((error) => of(addProductError({ error })))
                )
            )
        );
    });

    addProductSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addProductSuccess),
            tap(() => {
                this.snackBarService.openSuccessMessageBar(SnackbarMessages.productCreatedSuccessfully);
                this.navigationService.navigateToProductsPage()
            })
        ), { dispatch: false }
    );


    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateProduct),
            exhaustMap(({ product }) => this.productService.updateProduct(product)
                .pipe(
                    map(() => updateProductSuccess({ product })),
                    catchError((error) => of(updateProductError({ error })))
                )
            )
        );
    });

    updateProductSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProductSuccess),
            tap(() => {
                this.snackBarService.openSuccessMessageBar(SnackbarMessages.productUpdatedSuccessfully);
                this.navigationService.navigateToProductsPage()
            })
        ), { dispatch: false }
    );

    deleteProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteProduct),
            exhaustMap(({ productId }) => this.productService.deleteProduct(productId)
                .pipe(
                    map(() => deleteProductSuccess({ productId })),
                    catchError((error) => of(deleteProductError({ error })))
                )
            )
        );
    });

    deleteProductSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProductSuccess),
            tap(() => {
                this.matDialod.closeAll();
                this.navigationService.navigateToProductsPage();
                this.snackBarService.openSuccessMessageBar(SnackbarMessages.productDeletedSuccessfully);
            })
        ), { dispatch: false }
    );

    deleteProductError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProductError),
            tap(() => {
                this.matDialod.closeAll();
            })
        ), { dispatch: false }
    );

}