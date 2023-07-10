import { Component } from '@angular/core';
import { PRODUCTS } from 'src/app/mocks/products.mocks';
import { Product } from 'src/app/modules/shared/types/products.types';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: []
})
export class ProductsListComponent {
  products: Product[] = PRODUCTS;

  onAddToCart() {
    // TODO
    console.log("onAddToCart");
  }

  onCreateProduct() {
    // TODO
    console.log("onCreateProduct");
  }

  onProductClick() {
    // TODO
    console.log("onProductClick");
  }
}
