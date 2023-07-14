import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/containers/products-list/products-list.component';
import { ProductsDetailsComponent } from './components/containers/products-details/products-details.component';
import { ShoppingCartDetailsComponent } from './modules/shopping-cart/components/containers/shopping-cart-details/shopping-cart-details.component';

const routes: Routes = [
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductsDetailsComponent },
  { path: 'shopping-cart', component: ShoppingCartDetailsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
