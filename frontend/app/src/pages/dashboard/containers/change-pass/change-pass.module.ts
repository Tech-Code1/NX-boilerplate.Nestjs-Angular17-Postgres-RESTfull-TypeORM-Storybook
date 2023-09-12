import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormResetPassModule } from '../../../auth/components';
import { ChangePassComponent } from './change-pass.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePassComponent,
  },
];

@NgModule({
  declarations: [ChangePassComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormResetPassModule,
    RouterModule.forChild(routes),
  ],
  exports: [ChangePassComponent, RouterModule],
})
export class ChangePassModule {}
