import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NavigationRoutes } from '../modules/shared/types/navigation.routes.enum';
import { selectIsAuth } from '../modules/user/state/user.reducers';

export const notAuthGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuth).pipe(
    map((isAuth) => {
      return isAuth ? router.parseUrl(NavigationRoutes.Products) : true;
    })
  );
};
