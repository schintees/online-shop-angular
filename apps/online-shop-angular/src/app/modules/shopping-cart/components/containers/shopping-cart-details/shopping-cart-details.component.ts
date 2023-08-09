import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../../../types/cart.products.types';
import { Store } from '@ngrx/store';
import {
  createOrder,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart,
} from '../../../state/cart.actions';
import { Observable } from 'rxjs';
import { selectCartProducts } from '../../../state/cart.reducers';
import { AppState } from '../../../../../state/app.state';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { SnackbarMessages } from '../../../../shared/types/snackbar-messages.enum';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: [],
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
      this.snackBarService.openErrorMessageBar(SnackbarMessages.emptyCart);
    } else {
      this.store.dispatch(createOrder({ cartProducts }));
    }
  }

  onDeleteFromCart(productId: string) {
    this.store.dispatch(removeProductFromCart({ productId }));
  }

  onQuantityIncrease(productId: string) {
    this.store.dispatch(increaseProductQuantity({ productId }));
  }

  onQuantityDecrease(productId: string) {
    this.store.dispatch(decreaseProductQuantity({ productId }));
  }
}
