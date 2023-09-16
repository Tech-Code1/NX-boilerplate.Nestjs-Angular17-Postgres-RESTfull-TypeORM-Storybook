import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutLoginComponent } from '../../common/layouts';

const routes: Routes = [
  {
    path: '',
    component: LayoutLoginComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./containers/panel').then((module) => module.PanelModule),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./').then((module) => module.ChangePassModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
