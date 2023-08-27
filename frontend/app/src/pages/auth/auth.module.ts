import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutAuthModule } from '../../common/layouts';
import { FormLoginModule } from './components';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormLoginModule,
    LayoutAuthModule,
  ],
})
export class AuthModule {}
