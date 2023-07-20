import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormLoginComponent } from './form-login.component';

@NgModule({
  declarations: [FormLoginComponent],
  imports: [CommonModule, RouterModule],
  exports: [FormLoginComponent],
})
export class FormLoginModule {}
