import { shoppingCartReducer } from "../modules/shopping-cart/state/cart.reducers";
import { userReducer } from "../modules/user/state/user.reducers";
import { productReducer } from "./product/product.reducers";

export const appReducers = {
    products: productReducer, shoppingCart: shoppingCartReducer, user: userReducer
}
