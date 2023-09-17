import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordGuard {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = route.queryParams['token'];
    const id = route.queryParams['id'];

    if (token && id) {
      return true;
    }

    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
