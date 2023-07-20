import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../types/order.types';
import { Observable } from 'rxjs';
import { Product } from '../../shared/types/products.types';
import { CartProduct } from '../types/cart.products.types';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private API_URL: string = environment.apiUrl;
  cartProducts: CartProduct[] = [];

  constructor(private http: HttpClient) { }

  getCartProducts(): CartProduct[] {
    return this.cartProducts;
  }

  addProductToCart(product: Product): void {
    const existingCartProduct = this.cartProducts.find(cartItem => cartItem.product.id === product.id);
    if (!existingCartProduct) {
      this.cartProducts = [...this.cartProducts, { product, quantity: 1 }];
      return;
    }
    existingCartProduct.quantity++;
  }

  increaseProductQuantity(productId: string): CartProduct[] {
    const existingCartProduct = this.cartProducts.find(cartItem => cartItem.product.id === productId);
    if (existingCartProduct) {
      existingCartProduct.quantity++;
    }
    return this.cartProducts;
  }

  decreaseProductQuantity(productId: string): CartProduct[] {
    const existingCartProduct = this.cartProducts.find(cartItem => cartItem.product.id === productId);
    if (existingCartProduct && existingCartProduct.quantity > 1) {
      existingCartProduct.quantity--;
    }
    return this.cartProducts;
  }

  deleteProductFromCart(productId: string): CartProduct[] {
    return this.cartProducts = this.cartProducts.filter(p => p.product.id !== productId);
  }

  refreshCart(): CartProduct[] {
    return this.cartProducts = [];
  }

  createOrder(): Observable<Order> {
    const order: Order = {
      customerId: 'de96921d-2f8d-46e7-8061-31468180de96',
      products: this.cartProducts.map(cartProduct => ({ quantity: cartProduct.quantity, productId: cartProduct.product.id }))
    };
    return this.http.post<Order>(this.API_URL + '/orders', order);
  }

}
