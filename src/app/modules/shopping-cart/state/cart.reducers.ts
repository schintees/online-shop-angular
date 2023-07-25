import { createReducer, on } from "@ngrx/store";
import { CartProduct } from "../types/cart.products.types";
import { addProductToCart, createOrder, createOrderError, createOrderSuccess, decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } from "./cart.actions";


export interface ShoppingCartState {
    products: CartProduct[];
    loading: boolean;
    error?: string;
}

const initialState: ShoppingCartState = {
    products: [],
    loading: false,
    error: undefined
};

export const shoppingCartReducer = createReducer(
    initialState,

    // Create Order
    on(createOrder, (state) => ({
        ...state,
        loading: true,
    })),
    on(createOrderSuccess, (state) => ({
        ...state,
        products: [],
        loading: false,
        error: undefined,
    })),
    on(createOrderError, (state, { error }) => ({
        ...state,
        error: error,
        loading: false,
    })),

    // Remove Product From Cart
    on(removeProductFromCart, (state, { productId }) => ({
        ...state,
        products: state.products.filter(cartProduct => cartProduct.product.id !== productId)
    })),

    // Add Product To Cart
    on(addProductToCart, (state, { product }) => {
        const existingCartProduct = state.products.find(cartProduct => cartProduct.product.id === product.id);
        return {
            ...state,
            products:
                existingCartProduct ?
                    state.products.map(
                        cartProduct => cartProduct.product.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct) :
                    [...state.products, { product: { ...product }, quantity: 1 }]
        }
    }),

    // Increase Product Quantity
    on(increaseProductQuantity, (state, { productId }) => {
        const existingCartProduct = state.products.find(cartProduct => cartProduct.product.id === productId);
        return {
            ...state,
            products:
                existingCartProduct ?
                    state.products.map(
                        cartProduct => cartProduct.product.id === productId ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct) :
                    state.products
        }
    }),

    // Decrease Product Quantity
    on(decreaseProductQuantity, (state, { productId }) => {
        const existingCartProduct = state.products.find(cartProduct => cartProduct.product.id === productId);
        return {
            ...state,
            products:
                existingCartProduct && existingCartProduct.quantity > 1 ?
                    state.products.map(
                        cartProduct => cartProduct.product.id === productId ? { ...cartProduct, quantity: cartProduct.quantity - 1 } : cartProduct) :
                    state.products
        }

    }),

);