import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartDetailsViewComponent } from './shopping-cart-details-view.component';

describe('ShoppingCartDetailsViewComponent', () => {
  let component: ShoppingCartDetailsViewComponent;
  let fixture: ComponentFixture<ShoppingCartDetailsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartDetailsViewComponent]
    });
    fixture = TestBed.createComponent(ShoppingCartDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
