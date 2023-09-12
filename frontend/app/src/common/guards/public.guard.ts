import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginStateService } from '../../pages/auth/service/state';
import { AuthStatus } from '../../pages/auth/types';

export const PublicGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginStateService);
  const router = inject(Router);

  const allowedPublicRoutes = [
    '/auth/login',
    '/auth/change-password',
    '/auth/register',
    '/auth/recover',
  ];

  if (authService.authStatus() === AuthStatus.AUTHENTICATED) {
    if (!allowedPublicRoutes.includes(state.url)) {
      router.navigateByUrl('/dashboard');
      return false;
    }
  }

  return true;
};
