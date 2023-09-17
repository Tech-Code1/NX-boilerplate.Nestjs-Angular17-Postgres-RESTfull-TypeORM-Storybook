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

    console.log('Guard: token:', token);
    console.log('Guard: id:', id);

    if (token && id) {
      console.log('Guard: Access Allowed');
      return true;
    }

    console.log('Guard: Access Denied, Redirecting...');
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
