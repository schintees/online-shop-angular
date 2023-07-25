import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { deleteProduct } from 'src/app/state/product/product.actions';


@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: []
})
export class ConfirmDeleteDialogComponent {
  constructor(
    private store: Store<AppState>,
  ) { }

  onConfirm(id: string) {
    this.store.dispatch(deleteProduct({ productId: id }));
  }
}
