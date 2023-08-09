import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailsComponent } from './products-details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsDetailsViewComponent } from '../../presentational/products-details-view/products-details-view.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { NavigationService } from '../../../services/navigation.service';
import { loadProduct } from '../../../state/product/product.actions';
import { addProductToCart } from '../../../modules/shopping-cart/state/cart.actions';
import { SnackbarMessages } from '../../../modules/shared/types/snackbar-messages.enum';
import { Product } from '../../../modules/shared/types/products.types';


describe('ProductsDetailsComponent', () => {
  let component: ProductsDetailsComponent;
  let fixture: ComponentFixture<ProductsDetailsComponent>;

  const product: Product = {
    id: '7ed8b2fa-0d7f-4dab-a01e-5583841e0469',
    name: 'Notebook Basic 15',
    category: 'Laptops',
    image:
      'https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg',
    price: 956,
    description:
      'Notebook Basic 15 with 2,80 GHz quad core, 15" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro',
  };

  const initialState = {
    products: {
      products: [],
      selectedProduct: product,
      loading: false,
      error: undefined,
    },
  };

  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', [
      'openSuccessMessageBar',
    ]);
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', [
      'navigateToEditProductPage',
    ]);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [ProductsDetailsComponent, ProductsDetailsViewComponent],
      imports: [MatDialogModule, MatSnackBarModule, RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: product.id,
              }),
            },
          },
        },
      ],
    });
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(ProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch loadProduct when init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadProduct({ productId: product.id })
    );
  });

  it('should dispatch addProductToCart when onAddToCart', () => {
    component.onAddToCart(product);
    expect(dispatchSpy).toHaveBeenCalledWith(addProductToCart({ product }));
    expect(snackbarServiceSpy.openSuccessMessageBar).toHaveBeenCalledOnceWith(
      SnackbarMessages.productAddedToCartSuccessfully
    );
  });

  it('should navigate to edit product page when onEdit', () => {
    component.onEdit(product.id);
    expect(
      navigationServiceSpy.navigateToEditProductPage
    ).toHaveBeenCalledOnceWith(product.id);
  });

  it('should open dialog when onDelete', () => {
    component.onDelete(product.id, product.name);
    expect(dialogSpy.open).toHaveBeenCalledTimes(1);
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
