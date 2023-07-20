import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: []
})
export class UserNavigationComponent implements OnInit {
  username$?: Observable<string>;
  isAdmin$?: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin();
    this.username$ = this.authService.getUsername();
  }

  onLogout() {
    this.authService.logout();
    this.navigationService.navigateToLoginPage();
  }

  onLogin() {
    this.navigationService.navigateToLoginPage();
  }

  onHome() {
    this.navigationService.navigateToProductsPage();
  }

  onAddProduct() {
    this.navigationService.navigateToAddProducttPage();
  }

}
