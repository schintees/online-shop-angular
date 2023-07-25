import { createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducers";
import { AppState } from "src/app/state/app.state";

export const selectProductState = (state: AppState) => state.products;

export const selectAllProducts = createSelector(
    selectProductState,
    (state: ProductState) => state.products
);

export const selectProduct = createSelector(
    selectProductState,
    (state: ProductState) => state.selectedProduct
);


export const selectIsLoading = createSelector(
    selectProductState,
    (state: ProductState) => state.loading
)