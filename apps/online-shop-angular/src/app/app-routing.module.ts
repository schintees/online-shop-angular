import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/containers/products-list/products-list.component';
import { ProductsDetailsComponent } from './components/containers/products-details/products-details.component';
import { ShoppingCartDetailsComponent } from './modules/shopping-cart/components/containers/shopping-cart-details/shopping-cart-details.component';
import { ProductsFormComponent } from './components/containers/products-form/products-form.component';
import { NavigationRoutes } from './modules/shared/types/navigation.routes.enum';
import { UserLoginComponent } from './modules/user/components/containers/user-login/user-login.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { customerGuard } from './guards/customer.guard';
import { notAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: NavigationRoutes.Products,
    component: ProductsListComponent,
    canActivate: [authGuard],
  },
  {
    path: NavigationRoutes.AddProduct,
    component: ProductsFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: NavigationRoutes.EditProduct,
    component: ProductsFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: NavigationRoutes.ProductDetails,
    component: ProductsDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: NavigationRoutes.ShoppingCart,
    component: ShoppingCartDetailsComponent,
    canActivate: [customerGuard],
  },
  {
    path: NavigationRoutes.Login,
    component: UserLoginComponent,
    canActivate: [notAuthGuard],
  },
  { path: '', redirectTo: NavigationRoutes.Products, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
