import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/modules/shopping-cart/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>
  ) { }

  onConfirm(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(() => {
        this.cartService.deleteProductFromCart(id);
        this.dialogRef.close();
        this.router.navigate(["/products"]);
        this.snackBarService.openSuccessMessageBar("The product has been deleted successfully");
      });
  }
}
