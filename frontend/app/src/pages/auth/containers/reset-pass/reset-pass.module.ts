import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormResetPassModule } from '../../components';
import { ResetPassComponent } from './reset-pass.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPassComponent,
  },
];

@NgModule({
  declarations: [ResetPassComponent],
  imports: [CommonModule, FormResetPassModule, RouterModule.forChild(routes)],
  exports: [ResetPassComponent, RouterModule],
})
export class ResetPassModule {}
