import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Messages } from 'src/app/modules/shared/types/messages.const';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
    private productService: ProductService,
    private snackBarService: SnackbarService
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
      this.productService.getProduct(this.productId)
        .pipe(untilDestroyed(this))
        .subscribe(productResponse => this.productForm.patchValue(productResponse));
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
    this.productService.addProduct(this.productForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.snackBarService.openSuccessMessageBar(Messages.product.createdSuccessfully);
        this.navigationService.navigateToProductsPage()
      });
  }

  private updateProduct() {
    this.productService.updateProduct({ ...this.productForm.value, id: this.productId })
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.snackBarService.openSuccessMessageBar(Messages.product.updatedSuccessfully);
        this.navigationService.navigateToProductsPage()
      });
  }
}
