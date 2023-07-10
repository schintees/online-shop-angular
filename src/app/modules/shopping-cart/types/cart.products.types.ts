import { Product } from "../../shared/types/products.types";

export interface CartProduct {
    product: Product,
    quantity: number
}