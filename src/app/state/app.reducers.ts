import { ActionReducer } from "@ngrx/store";
import { shoppingCartReducer } from "../modules/shopping-cart/state/cart.reducers";
import { userReducer } from "../modules/user/state/user.reducers";
import { productReducer } from "./product/product.reducers";
import { localStorageSync } from "ngrx-store-localstorage";

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: ['user'],
        rehydrate: true
    })(reducer);
}

export const appReducers = {
    products: productReducer, shoppingCart: shoppingCartReducer, user: userReducer
}

export const appMetaReducers = {
    metaReducers: [localStorageSyncReducer]
}
