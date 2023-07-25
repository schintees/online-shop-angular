import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";
import { ShoppingCartState } from "./cart.reducers";

export const selectShoppingCartState = (state: AppState) => state.shoppingCart;

export const selectCartProducts = createSelector(
    selectShoppingCartState,
    (state: ShoppingCartState) => state.products
);
