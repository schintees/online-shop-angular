import { createReducer, on } from "@ngrx/store";
import { Product } from "../../modules/shared/types/products.types";
import { addProduct, addProductError, addProductSuccess, deleteProduct, deleteProductError, deleteProductSuccess, loadProduct, loadProductError, loadProductSuccess, loadProducts, loadProductsError, loadProductsSuccess, updateProduct, updateProductError, updateProductSuccess } from "./product.actions";


export interface ProductState {
    products: Product[];
    selectedProduct?: Product;
    loading: boolean;
    error?: string;
}

const initialState: ProductState = {
    products: [],
    selectedProduct: undefined,
    loading: true,
    error: undefined
};

export const productReducer = createReducer(
    initialState,

    // Load Products
    on(loadProducts, (state) => ({
        ...state,
        loading: true
    })),
    on(loadProductsSuccess, (state, { products }) => ({
        ...state,
        products: products,
        selectedProduct: undefined,
        loading: false,
        error: undefined
    })),
    on(loadProductsError, (state, { error }) => ({
        ...state,
        selectedProduct: undefined,
        loading: false,
        error: error
    })),

    // Load Product
    on(loadProduct, (state) => ({
        ...state,
        loading: true
    })),
    on(loadProductSuccess, (state, { product }) => ({
        ...state,
        selectedProduct: product,
        loading: false,
        error: undefined,
    })),
    on(loadProductError, (state, { error }) => ({
        ...state,
        selectedProduct: undefined,
        loading: false,
        error: error
    })),

    // Add product
    on(addProduct, (state) => ({
        ...state,
        loading: true
    })),
    on(addProductSuccess, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
        loading: false,
    })),
    on(addProductError, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),

    // Update product
    on(updateProduct, (state) => ({
        ...state,
        loading: true
    })),
    on(updateProductSuccess, (state, { product }) => ({
        ...state,
        products: state.products.map(existingProduct => existingProduct.id === product.id ? product : existingProduct),
        loading: false,
    })),
    on(updateProductError, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),

    // Delete product
    on(deleteProduct, (state) => ({
        ...state,
        loading: true
    })),
    on(deleteProductSuccess, (state, { productId }) => ({
        ...state,
        products: state.products.filter(existingProduct => existingProduct.id !== productId),
        loading: false,
    })),
    on(deleteProductError, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),
);