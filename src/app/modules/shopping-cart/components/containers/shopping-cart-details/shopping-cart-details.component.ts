import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../../../types/cart.products.types';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Messages } from 'src/app/modules/shared/types/messages.const';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { createOrder, decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } from '../../../state/cart.actions';
import { Observable } from 'rxjs';
import { selectCartProducts } from '../../../state/cart.reducers';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: []
})
export class ShoppingCartDetailsComponent implements OnInit {

  cartProducts$: Observable<CartProduct[]> | undefined;

  constructor(
    private store: Store<AppState>,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.cartProducts$ = this.store.select(selectCartProducts);
  }

  onCheckout(cartProducts: CartProduct[]) {
    if (cartProducts.length === 0) {
      this.snackBarService.openErrorMessageBar(Messages.cart.empty)
    } else {
      this.store.dispatch(createOrder({ cartProducts }))
    }
  }

  onDeleteFromCart(productId: string) {
    this.store.dispatch(removeProductFromCart({ productId }))
  }

  onQuantityIncrease(productId: string) {
    this.store.dispatch(increaseProductQuantity({ productId }))
  }

  onQuantityDecrease(productId: string) {
    this.store.dispatch(decreaseProductQuantity({ productId }))
  }

}
