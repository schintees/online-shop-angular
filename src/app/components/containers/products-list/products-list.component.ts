import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/shared/types/products.types';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: []
})
export class ProductsListComponent implements OnInit {
  products$?: Observable<Product[]>;

  constructor(
    private navigationService: NavigationService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.productService.getAllProducts();
  }

  onClickCart() {
    this.navigationService.navigateToShoppingCartPage();
  }

  onCreateProduct() {
    // TODO
    console.log("onCreateProduct");
  }

  onProductClick(productId: string) {
    this.navigationService.navigateToProductDetailsPage(productId);
  }
}
