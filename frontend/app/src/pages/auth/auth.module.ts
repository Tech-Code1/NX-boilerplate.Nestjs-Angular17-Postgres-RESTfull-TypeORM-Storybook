import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutLoginModule } from '../../common/layouts';
import { LayoutAuthModule } from './components/layout/layout-auth.module';
import { LoginStateService } from './service/state';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    LayoutLoginModule,
    LayoutAuthModule,
  ],
})
export class AuthModule {
  constructor(private loginStateService: LoginStateService) {
    this.loginStateService.initialize();
  }
}
