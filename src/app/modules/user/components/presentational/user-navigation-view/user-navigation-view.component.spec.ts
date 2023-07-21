import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavigationViewComponent } from './user-navigation-view.component';

describe('UserNavigationViewComponent', () => {
  let component: UserNavigationViewComponent;
  let fixture: ComponentFixture<UserNavigationViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserNavigationViewComponent]
    });
    fixture = TestBed.createComponent(UserNavigationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
