import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { isAuthenticatedGuard } from './common/guards';

export const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth').then((module) => module.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () =>
      import('./pages/dashboard').then((module) => module.DashboardModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home').then((module) => module.HomeModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
