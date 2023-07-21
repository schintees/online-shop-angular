import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/shared/types/products.types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/modules/shopping-cart/services/cart.service';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Messages } from 'src/app/modules/shared/types/messages.const';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: []
})
export class ProductsDetailsComponent implements OnInit {
  product$?: Observable<Product>;
  isAdmin$?: Observable<boolean>;
  isCustomer$?: Observable<boolean>;
  
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBarService: SnackbarService,
    private navigationService: NavigationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin();
    this.isCustomer$ = this.authService.isCustomer();
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product$ = this.productService.getProduct(id);
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
    this.cartService.addProductToCart(product);
    this.snackBarService.openSuccessMessageBar(Messages.cart.productAddedSuccessfully)
  }

}
