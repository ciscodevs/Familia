import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogle } from '../services/auth-google';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthGoogle);
  const router = inject(Router);

  return auth.listo$.pipe(
    filter((listo) => listo),
    take(1),
    map(() => {
      if (auth.estaAutenticado()) {
        return true;
      }

      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    })
  );
};
