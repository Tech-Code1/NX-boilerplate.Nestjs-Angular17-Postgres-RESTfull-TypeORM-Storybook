import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  ButtonComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from '@ui/components';
import { FormResetPassComponent } from './form-reset-pass.component';

const routes: Routes = [
  {
    path: '',
    component: FormResetPassComponent,
  },
];

@NgModule({
  declarations: [FormResetPassComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TitleComponent,
    InputComponent,
    LabelComponent,
    ButtonComponent,
  ],
  exports: [FormResetPassComponent],
})
export class FormResetPassModule {}
