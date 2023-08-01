import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailsComponent } from './products-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from 'src/app/modules/shared/types/products.types';
import { ProductsDetailsViewComponent } from '../../presentational/products-details-view/products-details-view.component';

describe('ProductsDetailsComponent', () => {
  let component: ProductsDetailsComponent;
  let fixture: ComponentFixture<ProductsDetailsComponent>;

  const product: Product = {
    id: "7ed8b2fa-0d7f-4dab-a01e-5583841e0469",
    name: "Notebook Basic 15",
    category: "Laptops",
    image: "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
    price: 956,
    description: "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro"
  }

  const initialState = {
    products: {
      products: [],
      selectedProduct: product,
      loading: false,
      error: undefined
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductsDetailsComponent,
        ProductsDetailsViewComponent
      ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    });
    fixture = TestBed.createComponent(ProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name in title', () => {
    let h1: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual(`Product: ${product.name}`);
  });

  it('should display product information', () => {
    let contentDiv = fixture.nativeElement.querySelector('.product-content');
    expect(contentDiv.textContent).toContain(product.name);
    expect(contentDiv.textContent).toContain(product.category);
    expect(contentDiv.textContent).toContain(product.price);
    expect(contentDiv.textContent).toContain(product.description);
  });

});
