import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteDialogViewComponent } from './confirm-delete-dialog-view.component';

describe('ConfirmDeleteDialogViewComponent', () => {
  let component: ConfirmDeleteDialogViewComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteDialogViewComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
