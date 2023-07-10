import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartDetailsComponent } from './shopping-cart-details.component';

describe('ShoppingCartDetailsComponent', () => {
  let component: ShoppingCartDetailsComponent;
  let fixture: ComponentFixture<ShoppingCartDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartDetailsComponent]
    });
    fixture = TestBed.createComponent(ShoppingCartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
