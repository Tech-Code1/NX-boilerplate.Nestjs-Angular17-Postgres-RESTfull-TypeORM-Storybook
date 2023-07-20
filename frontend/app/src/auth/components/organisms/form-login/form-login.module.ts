import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './form-login.component';

const routes: Routes = [
  {
    path: '',
    component: FormLoginComponent,
  },
];

@NgModule({
  declarations: [FormLoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [FormLoginComponent],
})
export class FormLoginModule {}
