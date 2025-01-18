import { Routes } from '@angular/router';
import { LayoutLoginComponent } from '../../common/layouts';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      {
        path: '',
        title: 'Panel',
        loadComponent: () =>
          import('.').then(
            (c) => c.PanelComponent
          ),
      },
      {
        path: 'change-password',
        title: 'Change Password',
        loadComponent: () =>
          import('.').then(
            (c) => c.ChangePassComponent
          ),
      },
    ],
  },
];
