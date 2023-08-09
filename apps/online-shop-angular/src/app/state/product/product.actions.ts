import { createAction, props } from '@ngrx/store';
import { Product } from '../../modules/shared/types/products.types';

// Load Products
export const loadProducts = createAction('[Product List] Load Products');

export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsError = createAction(
  '[Product API] Load Products Error',
  props<{ error: string }>()
);

// Load Product
export const loadProduct = createAction(
  '[Product Details] Load Product',
  props<{ productId: string }>()
);

export const loadProductSuccess = createAction(
  '[Product API] Load Product Success',
  props<{ product: Product }>()
);

export const loadProductError = createAction(
  '[Product API] Load Product Error',
  props<{ error: string }>()
);

// Add Product
export const addProduct = createAction(
  '[Product Form] Add product',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  '[Product API] Add Product Success',
  props<{ product: Product }>()
);

export const addProductError = createAction(
  '[Product API] Add Product Error',
  props<{ error: string }>()
);

// Update Product
export const updateProduct = createAction(
  '[Product Form] Update product',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product API] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductError = createAction(
  '[Product API] Update Product Error',
  props<{ error: string }>()
);

// Delete Product
export const deleteProduct = createAction(
  '[Deletion Confirmation Dialog] Delete product',
  props<{
    productId: string;
  }>()
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{
    productId: string;
  }>()
);

export const deleteProductError = createAction(
  '[Product API] Delete Product Error',
  props<{ error: string }>()
);
