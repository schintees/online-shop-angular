import { ProductState } from "./product/product.reducers";
import { ShoppingCartState } from "../modules/shopping-cart/state/cart.reducers";
import { UserState } from "../modules/user/state/user.reducers";

export interface AppState {
    products: ProductState,
    shoppingCart: ShoppingCartState,
    user: UserState
}