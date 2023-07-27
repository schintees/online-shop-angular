import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NavigationRoutes } from '../modules/shared/types/navigation.routes.enum';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsAuth } from '../modules/user/state/user.reducers';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuth).pipe(
    map((isAuth) => {
      return isAuth ? true : router.parseUrl(NavigationRoutes.Login);
    })
  );
};
