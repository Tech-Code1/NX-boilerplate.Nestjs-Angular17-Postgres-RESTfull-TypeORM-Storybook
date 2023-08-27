import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { LayoutLoginComponent } from './layout-login.component';

@NgModule({
  declarations: [LayoutLoginComponent],
  imports: [CommonModule, RouterModule, RouterLinkActive],
  exports: [LayoutLoginComponent],
})
export class LayoutLoginModule {}
