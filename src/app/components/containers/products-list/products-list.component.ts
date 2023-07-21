import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/shared/types/products.types';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: []
})
export class ProductsListComponent implements OnInit {
  products$?: Observable<Product[]>;
  isAdmin$?: Observable<boolean>;
  isCustomer$?: Observable<boolean>;

  constructor(
    private navigationService: NavigationService,
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.isAdmin$ = this.authService.isAdmin();
    this.isCustomer$ = this.authService.isCustomer();
    this.products$ = this.productService.getAllProducts();
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
