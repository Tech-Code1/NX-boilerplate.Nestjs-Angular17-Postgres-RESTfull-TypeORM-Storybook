import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormResetPassModule } from '../../../auth/components';
import { ResetPassComponent } from './reset-pass.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPassComponent,
  },
];

@NgModule({
  declarations: [ResetPassComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormResetPassModule,
    RouterModule.forChild(routes),
  ],
  exports: [ResetPassComponent, RouterModule],
})
export class ResetPassModule {}
