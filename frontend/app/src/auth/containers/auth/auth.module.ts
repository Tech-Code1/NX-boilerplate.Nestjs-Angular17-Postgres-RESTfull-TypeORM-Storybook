import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormLoginModule } from '../../components';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormLoginModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
