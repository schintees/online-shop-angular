import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../types/order.types';
import { Observable } from 'rxjs';
import { CartProduct } from '../types/cart.products.types';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOrder(cartProducts: CartProduct[]): Observable<Order> {
    const order: Order = {
      customerId: 'de96921d-2f8d-46e7-8061-31468180de96',
      products: cartProducts.map((cartProduct) => ({
        quantity: cartProduct.quantity,
        productId: cartProduct.product.id,
      })),
    };
    return this.http.post<Order>(this.API_URL + '/orders', order);
  }
}
