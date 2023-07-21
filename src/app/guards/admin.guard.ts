import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/user/services/auth.service';
import { NavigationRoutes } from '../modules/shared/types/navigation.routes.enum';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }
  return router.parseUrl(NavigationRoutes.Products);
};
