import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/containers/products-list/products-list.component';
import { ProductsDetailsComponent } from './components/containers/products-details/products-details.component';
import { ShoppingCartDetailsComponent } from './modules/shopping-cart/components/containers/shopping-cart-details/shopping-cart-details.component';
import { NavigationRoutes } from './modules/shared/types/navigation.routes.enum';

const routes: Routes = [
  { path: NavigationRoutes.Products, component: ProductsListComponent },
  { path: NavigationRoutes.ProductDetails, component: ProductsDetailsComponent },
  { path: NavigationRoutes.ShoppingCart, component: ShoppingCartDetailsComponent },
  { path: '', redirectTo: NavigationRoutes.Products, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
