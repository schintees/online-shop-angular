import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationRoutes } from '../modules/shared/types/navigation.routes.enum';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  navigateToProductsPage() {
    this.router.navigate([NavigationRoutes.Products]);
  }

  navigateToProductDetailsPage(productId: string) {
    this.router.navigate([NavigationRoutes.Products, productId]);
  }

  navigateToEditProductPage(productId: string) {
    this.router.navigate([`/products/${productId}/edit`]);
  }

  navigateToAddProductPage() {
    this.router.navigate([NavigationRoutes.AddProduct]);
  }

  navigateToShoppingCartPage() {
    this.router.navigate([NavigationRoutes.ShoppingCart]);
  }

  navigateToLoginPage() {
    this.router.navigate([NavigationRoutes.Login])
  }

}
