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
import { FormRecoverComponent } from './form-recover.component';

const routes: Routes = [
  {
    path: '',
    component: FormRecoverComponent,
  },
];

@NgModule({
  declarations: [FormRecoverComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TitleComponent,
    InputComponent,
    LabelComponent,
    ButtonComponent,
  ],
  exports: [FormRecoverComponent],
})
export class FormRecoverModule {}
