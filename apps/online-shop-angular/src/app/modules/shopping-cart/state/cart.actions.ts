import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/types/products.types';
import { CartProduct } from '../types/cart.products.types';

// Create Order
export const createOrder = createAction(
  '[Shopping Cart Details] Create Order',
  props<{ cartProducts: CartProduct[] }>()
);

export const createOrderSuccess = createAction(
  '[Shopping Cart API] Create Order Success'
);

export const createOrderError = createAction(
  '[Shopping Cart API] Create Order Error',
  props<{ error: string }>()
);

// Remove Product
export const removeProductFromCart = createAction(
  '[Shopping Cart Details] Remove Product',
  props<{ productId: string }>()
);

// Add Product
export const addProductToCart = createAction(
  '[Product Details] Add Product To Cart',
  props<{ product: Product }>()
);

// Increase Product Quantity
export const increaseProductQuantity = createAction(
  '[Shopping Cart Details] Increase Product Quantity',
  props<{ productId: string }>()
);

// Decrease Product Quantity
export const decreaseProductQuantity = createAction(
  '[Shopping Cart Details] Decrease Product Quantity',
  props<{ productId: string }>()
);
