import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormLoginModule } from './components';
import { LayoutAuthModule } from './layout/layout-auth.module';

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
