import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PrivateGuard, PublicGuard } from './common/guards';
import { HomeComponent } from './pages';
import { authRoutes } from './pages/auth';
import { dashboardRoutes } from './pages/dashboard';

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
    title: 'Home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
