import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStateService } from './pages/auth/service/state';
import { AuthStatus } from './pages/auth/types';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  title = 'Template Angular';

  private authService = inject(LoginStateService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.CHECKING) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    const currentRoute = this.router.url;
    const allowedPublicRoutes = [
      '/auth/login',
      '/auth/register',
      '/auth/recover',
      '/auth/change-password',
    ];

    console.log('authStatus:', this.authService.authStatus());
    switch (this.authService.authStatus()) {
      case AuthStatus.CHECKING:
        return;

      case AuthStatus.AUTHENTICATED:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.NOT_AUTHENTICATED:
        if (!allowedPublicRoutes.includes(currentRoute)) {
          this.router.navigateByUrl('/auth/login');
        }
        return;
    }
  });
}
