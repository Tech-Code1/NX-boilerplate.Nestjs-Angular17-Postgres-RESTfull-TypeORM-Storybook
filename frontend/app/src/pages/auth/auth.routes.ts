import { Routes } from '@angular/router';
import { ResetPasswordGuard } from '../../common/guards';
import { LayoutLoginComponent } from '../../common/layouts';
import { LayoutAuthComponent } from './components/layout/layout-auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      {
        path: '',
        component: LayoutAuthComponent,
        children: [
          {
            path: 'login',
            title: 'Login',
            loadComponent: () =>
              import('.').then((c) => c.LoginComponent),
          },
          {
            path: 'register',
            title: 'Register',
            loadComponent: () =>
              import('.').then(
                (c) => c.RegisterComponent
              ),
          },
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'recover',
        title: 'Recover password',
        loadComponent: () =>
          import('.').then((c) => c.RecoverComponent),
      },
      {
        path: 'reset-password',
        title: 'Reset password',
        loadComponent: () =>
          import('.').then(
            (c) => c.ResetPassComponent
          ),
        canActivate: [ResetPasswordGuard],
      },
    ],
  },
];
