import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-form-view',
  templateUrl: './products-form-view.component.html',
  styleUrls: ['./products-form-view.component.scss'],
})
export class ProductsFormViewComponent {
  @Input() productForm!: FormGroup;
  @Input() isAddMode: boolean = true;

  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  hasError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  };
}
