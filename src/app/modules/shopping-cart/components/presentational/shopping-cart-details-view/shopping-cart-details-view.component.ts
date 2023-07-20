import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProduct } from '../../../types/cart.products.types';

@Component({
  selector: 'app-shopping-cart-details-view',
  templateUrl: './shopping-cart-details-view.component.html',
  styleUrls: ['./shopping-cart-details-view.component.scss']
})
export class ShoppingCartDetailsViewComponent {
  @Input() cartProducts?: CartProduct[];

  @Output() onQuantityIncrease: EventEmitter<string> = new EventEmitter<string>();
  @Output() onQuantityDecrease: EventEmitter<string> = new EventEmitter<string>();

  @Output() onDeleteFromCart: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCheckout: EventEmitter<void> = new EventEmitter<void>();

}
