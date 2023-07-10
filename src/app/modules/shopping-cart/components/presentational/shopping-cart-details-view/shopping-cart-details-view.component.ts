import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProduct } from '../../../types/cart.products.types';
import { Product } from 'src/app/modules/shared/types/products.types';

@Component({
  selector: 'app-shopping-cart-details-view',
  templateUrl: './shopping-cart-details-view.component.html',
  styleUrls: ['./shopping-cart-details-view.component.scss']
})
export class ShoppingCartDetailsViewComponent {
  @Input() cartProducts?: CartProduct[];

  @Output() onQuantityIncrease: EventEmitter<void> = new EventEmitter<void>();
  @Output() onQuantityDecrease: EventEmitter<void> = new EventEmitter<void>();

  @Output() onDeleteFromCart: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCheckout: EventEmitter<void> = new EventEmitter<void>();

}
