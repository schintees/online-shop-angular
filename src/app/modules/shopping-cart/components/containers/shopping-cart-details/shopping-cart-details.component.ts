import { Component } from '@angular/core';
import { CartProduct } from '../../../types/cart.products.types';
import { PRODUCTS } from 'src/app/mocks/products.mocks';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: []
})
export class ShoppingCartDetailsComponent {

  cartProducts: CartProduct[] = [{
    product: PRODUCTS[0],
    quantity: 2
  }];

  onCheckout() {
    // TODO
    console.log("onCheckout");
  }

  onDeleteFromCart(productId: string) {
    this.cartProducts = this.cartProducts.filter(p => p.product.id !== productId);
  }

  onQuantityIncrease() {
    // TODO
    console.log("onQuantityIncrease");
  }

  onQuantityDecrease() {
    // TODO
    console.log("onQuantityDecrease");
  }

}
