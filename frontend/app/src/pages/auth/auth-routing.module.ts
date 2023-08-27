import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAuthComponent } from '../../common/layouts';

const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./').then((module) => module.LoginModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
