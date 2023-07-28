import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { addProduct, loadProduct, updateProduct } from 'src/app/state/product/product.actions';
import { NavigationService } from 'src/app/services/navigation.service';
import { selectProduct } from 'src/app/state/product/product.reducers';

@UntilDestroy()
@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: []
})
export class ProductsFormComponent implements OnInit {
  isAddMode!: boolean;
  productForm!: FormGroup;
  productId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.isAddMode = !this.productId;

    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });

    if (!this.isAddMode) {
      this.store.dispatch(loadProduct({ productId: this.productId }));
      this.store.select(selectProduct)
        .pipe(untilDestroyed(this))
        .subscribe(productResponse => this.productForm.patchValue(productResponse!));
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.isAddMode ? this.createProduct() : this.updateProduct();
  }

  onCancel() {
    this.navigationService.navigateToProductsPage()
  }

  private createProduct() {
    this.store.dispatch(addProduct({ product: this.productForm.value }));
  }

  private updateProduct() {
    this.store.dispatch(updateProduct({ product: { ...this.productForm.value, id: this.productId } }));
  }
}
