import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../../../types/cart.products.types';
import { CartService } from '../../../services/cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Messages } from 'src/app/modules/shared/types/messages.const';

@UntilDestroy()
@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: []
})
export class ShoppingCartDetailsComponent implements OnInit {

  cartProducts?: CartProduct[];

  constructor(
    private cartService: CartService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProducts();
  }

  onCheckout() {
    if (this.cartProducts?.length === 0) {
      this.snackBarService.openErrorMessageBar(Messages.cart.empty)
    } else {
      this.cartService.createOrder()
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.cartProducts = this.cartService.refreshCart();
          this.snackBarService.openSuccessMessageBar(Messages.cart.orderCreatedSuccessfully)
        });
    }
  }

  onDeleteFromCart(productId: string) {
    this.cartProducts = this.cartService.deleteProductFromCart(productId);
    if (this.cartProducts.length === 0) {
      this.snackBarService.openSuccessMessageBar(Messages.cart.empty)
    }
  }

  onQuantityIncrease(productId: string) {
    this.cartProducts = this.cartService.increaseProductQuantity(productId);
  }

  onQuantityDecrease(productId: string) {
    this.cartProducts = this.cartService.decreaseProductQuantity(productId);
  }

}
