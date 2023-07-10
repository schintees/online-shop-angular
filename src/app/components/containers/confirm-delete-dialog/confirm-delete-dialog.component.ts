import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: []
})
export class ConfirmDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { productId: string, productName: string }) { }

  onConfirm() {
    // TODO: delete product

    console.log("delete product confirmation");
  }
}
