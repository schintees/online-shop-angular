import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NavigationRoutes } from '../modules/shared/types/navigation.routes.enum';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../modules/user/state/user.selectors';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAdmin).pipe(
    map((isAdmin) => {
      return isAdmin ? true : router.parseUrl(NavigationRoutes.Products);
    })
  );
};
