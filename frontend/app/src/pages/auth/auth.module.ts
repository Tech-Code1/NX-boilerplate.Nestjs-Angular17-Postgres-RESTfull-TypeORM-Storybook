import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutLoginModule } from '../../common/layouts';
import { FormLoginModule } from './components';
import { LayoutAuthModule } from './components/layout/layout-auth.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormLoginModule,
    LayoutLoginModule,
    LayoutAuthModule,
  ],
})
export class AuthModule {}
