import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/shared/types/products.types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/modules/shopping-cart/services/cart.service';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Messages } from 'src/app/modules/shared/types/messages.const';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: []
})
export class ProductsDetailsComponent implements OnInit {
  product$?: Observable<Product>;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product$ = this.productService.getProduct(id);
  }

  onEdit() {
    // TODO
    console.log("onEdit");
  }

  onDelete(productId: string, productName: string) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '40%',
      data: { productId, productName },
    });
  }

  onAddToCart(product: Product) {
    this.cartService.addProductToCart(product);
    this.snackBarService.openSuccessMessageBar(Messages.cart.productAddedSuccessfully)
  }

}
