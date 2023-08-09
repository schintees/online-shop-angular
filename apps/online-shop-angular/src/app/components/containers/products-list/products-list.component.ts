import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from '../../../modules/shared/types/products.types';
import { AppState } from '../../../state/app.state';
import { NavigationService } from '../../../services/navigation.service';
import { selectAllProducts, selectIsLoading } from '../../../state/product/product.reducers';
import { selectIsAdmin, selectIsCustomer } from '../../../modules/user/state/user.reducers';
import { loadProducts } from '../../../state/product/product.actions';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: [],
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  isAdmin$: Observable<boolean | undefined> | undefined;
  isCustomer$: Observable<boolean | undefined> | undefined;
  isLoading$: Observable<boolean | undefined> | undefined;

  constructor(
    private store: Store<AppState>,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(selectAllProducts);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.isCustomer$ = this.store.select(selectIsCustomer);
    this.isLoading$ = this.store.select(selectIsLoading);

    this.store.dispatch(loadProducts());
  }

  onClickCart() {
    this.navigationService.navigateToShoppingCartPage();
  }

  onCreateProduct() {
    this.navigationService.navigateToAddProductPage();
  }

  onProductClick(productId: string) {
    this.navigationService.navigateToProductDetailsPage(productId);
  }
}
