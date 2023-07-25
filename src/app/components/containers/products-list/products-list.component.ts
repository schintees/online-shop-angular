import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/shared/types/products.types';
import { NavigationService } from 'src/app/services/navigation.service';
import { Store } from '@ngrx/store';
import { selectAllProducts, selectIsLoading } from 'src/app/state/product/product.selectors';
import { loadProducts } from 'src/app/state/product/product.actions';
import { AppState } from 'src/app/state/app.state';
import { selectIsAdmin, selectIsCustomer } from 'src/app/modules/user/state/user.selectors';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: []
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]> = this.store.select(selectAllProducts);
  isAdmin$: Observable<boolean | undefined> = this.store.select(selectIsAdmin);
  isCustomer$: Observable<boolean | undefined> = this.store.select(selectIsCustomer);
  isLoading$: Observable<boolean | undefined> = this.store.select(selectIsLoading);

  constructor(
    private store: Store<AppState>,
    private navigationService: NavigationService,
  ) { }

  ngOnInit() {
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
