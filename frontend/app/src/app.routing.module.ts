import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth').then((module) => module.AuthModule),
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
