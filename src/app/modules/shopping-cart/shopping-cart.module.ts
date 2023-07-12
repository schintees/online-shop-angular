import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartDetailsComponent } from './components/containers/shopping-cart-details/shopping-cart-details.component';
import { ShoppingCartDetailsViewComponent } from './components/presentational/shopping-cart-details-view/shopping-cart-details-view.component';
import { IconButtonComponent } from '../shared/components/presentational/icon-button/icon-button.component';
import { MatButton, MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ShoppingCartDetailsComponent,
    ShoppingCartDetailsViewComponent
  ],
  imports: [
    CommonModule,
    IconButtonComponent,
    MatButtonModule
  ],
  exports: [
    ShoppingCartDetailsComponent
  ]
})
export class ShoppingCartModule { }
