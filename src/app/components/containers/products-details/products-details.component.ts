import { Component, EventEmitter, Output } from '@angular/core';
import { PRODUCTS } from 'src/app/mocks/products.mocks';
import { Product } from 'src/app/modules/shared/types/products.types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogViewComponent } from '../../presentational/confirm-delete-dialog-view/confirm-delete-dialog-view.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: []
})
export class ProductsDetailsComponent {
  product: Product = PRODUCTS[0];

  constructor(private dialog: MatDialog) { }

  onEdit() {
    // TODO
    console.log("onEdit");
  }

  onDelete() {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '40%',
      data: { productId: this.product?.id, productName: this.product?.name },
    });
  }

}
