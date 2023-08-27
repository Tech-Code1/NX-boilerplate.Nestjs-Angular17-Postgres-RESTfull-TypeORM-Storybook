import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
          },
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
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
