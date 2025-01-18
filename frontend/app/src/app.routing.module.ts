import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PrivateGuard, PublicGuard } from './common/guards';
import { authRoutes } from './pages/auth';
import { dashboardRoutes } from './pages/dashboard';
import { homeRoutes } from './pages/home';

export const routes: Route[] = [
  {
    path: 'auth',
    canActivate: [PublicGuard],
    children: authRoutes,
  },
  {
    path: 'dashboard',
    canActivate: [PrivateGuard],
    children: dashboardRoutes,
  },
  {
    path: '',
    children: homeRoutes
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
