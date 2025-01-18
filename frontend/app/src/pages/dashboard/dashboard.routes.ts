import { Routes } from '@angular/router';
import { LayoutLoginComponent } from '../../common/layouts';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('.').then(
            (c) => c.PanelComponent
          ),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('.').then(
            (c) => c.ChangePassComponent
          ),
      },
    ],
  },
];
