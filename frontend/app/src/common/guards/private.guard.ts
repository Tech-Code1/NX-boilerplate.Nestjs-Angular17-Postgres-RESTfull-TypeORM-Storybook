import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginStateService } from '../../pages/auth/service/state';
import { AuthStatus } from '../../pages/auth/types';

export const PrivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginStateService);

  if (authService.authStatus() === AuthStatus.AUTHENTICATED) {
    return true;
  }

  const router = inject(Router);

  router.navigateByUrl('auth/login');

  return false;
};
