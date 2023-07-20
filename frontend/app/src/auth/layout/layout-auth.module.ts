import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { LayoutAuthComponent } from './layout-auth.component';

@NgModule({
  declarations: [LayoutAuthComponent],
  imports: [CommonModule, RouterModule, RouterLinkActive],
  exports: [LayoutAuthComponent],
})
export class LayoutAuthModule {}
