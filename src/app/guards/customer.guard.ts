import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NavigationRoutes } from '../modules/shared/types/navigation.routes.enum';
import { selectIsCustomer } from '../modules/user/state/user.selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

export const customerGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsCustomer).pipe(
    map((isCustomer) => {
      return isCustomer ? true : router.parseUrl(NavigationRoutes.Products);
    })
  );
};
