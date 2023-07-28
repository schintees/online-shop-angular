import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/shared/types/products.types';
import { NavigationService } from 'src/app/services/navigation.service';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/state/product/product.actions';
import { AppState } from 'src/app/state/app.state';
import { selectAllProducts, selectIsLoading } from 'src/app/state/product/product.reducers';
import { selectIsAdmin, selectIsCustomer } from 'src/app/modules/user/state/user.reducers';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: []
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  isAdmin$: Observable<boolean | undefined> | undefined;
  isCustomer$: Observable<boolean | undefined> | undefined;
  isLoading$: Observable<boolean | undefined> | undefined;

  constructor(
    private store: Store<AppState>,
    private navigationService: NavigationService,
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(selectAllProducts);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.isCustomer$ = this.store.select(selectIsCustomer);
    this.isLoading$ = this.store.select(selectIsLoading);

    this.store.dispatch(loadProducts())
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
