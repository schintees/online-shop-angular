import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/shared/types/products.types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Messages } from 'src/app/modules/shared/types/messages.const';
import { NavigationService } from 'src/app/services/navigation.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { loadProduct } from 'src/app/state/product/product.actions';
import { selectProduct } from 'src/app/state/product/product.selectors';
import { addProductToCart } from 'src/app/modules/shopping-cart/state/cart.actions';
import { selectIsAdmin, selectIsCustomer } from 'src/app/modules/user/state/user.selectors';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: []
})
export class ProductsDetailsComponent implements OnInit {
  product$: Observable<Product | undefined> = this.store.select(selectProduct);
  isAdmin$: Observable<boolean | undefined> = this.store.select(selectIsAdmin);
  isCustomer$: Observable<boolean | undefined> = this.store.select(selectIsCustomer);

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private snackBarService: SnackbarService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadProduct({ productId: id }));
  }

  onEdit(productId: string) {
    this.navigationService.navigateToEditProducttPage(productId);
  }

  onDelete(productId: string, productName: string) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '40%',
      data: { productId, productName },
    });
  }

  onAddToCart(product: Product) {
    this.store.dispatch(addProductToCart({ product }))
    this.snackBarService.openSuccessMessageBar(Messages.cart.productAddedSuccessfully)
  }

}
