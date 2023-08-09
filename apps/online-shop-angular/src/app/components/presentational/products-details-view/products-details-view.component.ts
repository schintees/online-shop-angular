import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../modules/shared/types/products.types';

@Component({
  selector: 'app-products-details-view',
  templateUrl: './products-details-view.component.html',
  styleUrls: ['./products-details-view.component.scss'],
})
export class ProductsDetailsViewComponent {
  @Input() product?: Product;
  @Input() isAdmin?: boolean;
  @Input() isCustomer?: boolean;

  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onAddToCart: EventEmitter<void> = new EventEmitter<void>();
}
