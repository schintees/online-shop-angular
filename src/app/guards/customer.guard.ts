import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/user/services/auth.service';
import { inject } from '@angular/core';
import { NavigationRoutes } from '../modules/shared/types/navigation.routes.enum';

export const customerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isCustomer()) {
    return true;
  }
  return router.parseUrl(NavigationRoutes.Products);
};
