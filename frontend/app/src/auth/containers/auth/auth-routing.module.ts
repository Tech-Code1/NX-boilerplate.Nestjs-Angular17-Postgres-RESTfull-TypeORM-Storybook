import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAuthComponent } from '../../layout/layout-auth.component';

const routes: Routes = [
  {
    path: 'login',
    component: LayoutAuthComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./login/login.module').then((module) => module.LoginModule),
      },
      /* {
        path: 'register',
        loadChildren: () =>
          import('../../components').then(
            (module) => module.FormRegisterModule
          ),
      }, */
      { path: '**', redirectTo: '/auth/login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
