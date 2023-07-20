import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/modules/shared/types/products.types';

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss']
})
export class ProductsListViewComponent {
  @Input() products: Product[] = [];

  @Output() onClickCart: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCreateProduct: EventEmitter<void> = new EventEmitter<void>();
  @Output() onProductClick: EventEmitter<string> = new EventEmitter<string>();

}
