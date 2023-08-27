import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutLoginModule } from '../../common/layouts';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    LayoutLoginModule,
  ],
})
export class DashboardModule {}
