import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { ResetPasswordGuard } from '../../common/guards';
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
        path: 'reset-password',
        loadChildren: () =>
          import('./').then((module) => module.ResetPassModule),
        canActivate: [ResetPasswordGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AuthRoutingModule {}
