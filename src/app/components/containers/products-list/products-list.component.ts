import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/shared/types/products.types';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: []
})
export class ProductsListComponent implements OnInit {
  products$?: Observable<Product[]>;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.productService.getAllProducts();
  }

  onClickCart() {
    this.router.navigate(["/shopping-cart"]);
  }

  onCreateProduct() {
    // TODO
    console.log("onCreateProduct");
  }

  onProductClick(productId: string) {
    this.router.navigate(["/products", productId]);
  }
}
