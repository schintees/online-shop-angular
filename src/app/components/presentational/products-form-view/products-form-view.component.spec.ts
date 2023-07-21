import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFormViewComponent } from './products-form-view.component';

describe('ProductsFormViewComponent', () => {
  let component: ProductsFormViewComponent;
  let fixture: ComponentFixture<ProductsFormViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsFormViewComponent]
    });
    fixture = TestBed.createComponent(ProductsFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
