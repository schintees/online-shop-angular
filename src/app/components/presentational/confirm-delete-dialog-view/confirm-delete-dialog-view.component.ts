import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog-view',
  templateUrl: './confirm-delete-dialog-view.component.html',
  styleUrls: ['./confirm-delete-dialog-view.component.scss']
})
export class ConfirmDeleteDialogViewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { productId: string, productName: string }) { }

  @Output() onConfirm: EventEmitter<string> = new EventEmitter<string>();

}
