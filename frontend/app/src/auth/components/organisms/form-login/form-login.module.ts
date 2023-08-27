import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent, LabelComponent, TitleComponent } from '@ui/components';
import { ButtonComponent } from '../../../../../../ui/components/molecules/button/button.component';
import { FormLoginComponent } from './form-login.component';

const routes: Routes = [
  {
    path: '',
    component: FormLoginComponent,
  },
];

@NgModule({
  declarations: [FormLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TitleComponent,
    InputComponent,
    LabelComponent,
    ButtonComponent,
  ],
  exports: [FormLoginComponent],
})
export class FormLoginModule {}
