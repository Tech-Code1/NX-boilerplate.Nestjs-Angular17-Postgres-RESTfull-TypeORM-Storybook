import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterComponent } from './form-register.component';

const routes: Routes = [
  {
    path: '',
    component: FormRegisterComponent,
  },
];

@NgModule({
  declarations: [FormRegisterComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [FormRegisterComponent],
})
export class FormRegisterModule {}
