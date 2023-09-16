import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordGuard } from '../../common/guards';
import { LayoutLoginComponent } from '../../common/layouts';
import { LayoutAuthComponent } from './components/layout/layout-auth.component';

const routes: Routes = [
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
            loadChildren: () =>
              import('./').then((module) => module.LoginModule),
          },
          {
            path: 'register',
            loadChildren: () =>
              import('./').then((module) => module.RegisterModule),
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
        loadChildren: () => import('./').then((module) => module.RecoverModule),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./').then((module) => module.ResetPassModule),
        canActivate: [ChangePasswordGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
