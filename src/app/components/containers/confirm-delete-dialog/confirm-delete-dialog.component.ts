import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Messages } from 'src/app/modules/shared/types/messages.const';
import { CartService } from 'src/app/modules/shopping-cart/services/cart.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@UntilDestroy()
@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: []
})
export class ConfirmDeleteDialogComponent {
  constructor(
    private productService: ProductService,
    private snackBarService: SnackbarService,
    private cartService: CartService,
    private navigationService: NavigationService,
    private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>
  ) { }

  onConfirm(id: string) {
    this.productService.deleteProduct(id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.cartService.deleteProductFromCart(id);
        this.dialogRef.close();
        this.navigationService.navigateToProductsPage();
        this.snackBarService.openSuccessMessageBar(Messages.product.deletedSuccessfully);
      });
  }
}
