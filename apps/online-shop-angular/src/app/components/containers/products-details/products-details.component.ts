import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from '../../../modules/shared/types/products.types';
import { AppState } from '../../../state/app.state';
import { SnackbarService } from '../../../services/snackbar.service';
import { NavigationService } from '../../../services/navigation.service';
import { selectProduct } from '../../../state/product/product.reducers';
import { selectIsAdmin, selectIsCustomer } from '../../../modules/user/state/user.reducers';
import { loadProduct } from '../../../state/product/product.actions';
import { addProductToCart } from '../../../modules/shopping-cart/state/cart.actions';
import { SnackbarMessages } from '../../../modules/shared/types/snackbar-messages.enum';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: [],
})
export class ProductsDetailsComponent implements OnInit {
  product$: Observable<Product | undefined> | undefined;
  isAdmin$: Observable<boolean | undefined> | undefined;
  isCustomer$: Observable<boolean | undefined> | undefined;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private snackBarService: SnackbarService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.product$ = this.store.select(selectProduct);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.isCustomer$ = this.store.select(selectIsCustomer);

    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadProduct({ productId: id }));
  }

  onEdit(productId: string) {
    this.navigationService.navigateToEditProductPage(productId);
  }

  onDelete(productId: string, productName: string) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '40%',
      data: { productId, productName },
    });
  }

  onAddToCart(product: Product) {
    this.store.dispatch(addProductToCart({ product }));
    this.snackBarService.openSuccessMessageBar(
      SnackbarMessages.productAddedToCartSuccessfully
    );
  }
}
