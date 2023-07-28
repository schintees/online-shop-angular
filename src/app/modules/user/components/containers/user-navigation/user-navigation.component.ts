import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { logout } from '../../../state/user.actions';
import { selectCurrentUsername, selectIsAdmin } from '../../../state/user.reducers';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: []
})
export class UserNavigationComponent implements OnInit {
  username$: Observable<string | undefined> | undefined;
  isAdmin$: Observable<boolean | undefined> | undefined;

  constructor(
    private store: Store<AppState>,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.username$ = this.store.select(selectCurrentUsername);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  onLogout() {
    this.store.dispatch(logout())
  }

  onLogin() {
    this.navigationService.navigateToLoginPage();
  }

  onHome() {
    this.navigationService.navigateToProductsPage();
  }

  onAddProduct() {
    this.navigationService.navigateToAddProductPage();
  }

}
