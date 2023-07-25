import { ShoppingCartEffects } from "../modules/shopping-cart/state/cart.effects";
import { UserEffects } from "../modules/user/state/user.effects";
import { ProductEffects } from "./product/product.effects";

export const appEffects = [
    ProductEffects,
    ShoppingCartEffects,
    UserEffects
]