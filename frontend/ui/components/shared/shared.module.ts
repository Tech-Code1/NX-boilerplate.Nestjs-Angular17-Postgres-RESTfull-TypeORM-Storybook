import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccesorDirective } from './directives/control-value-accesor.directive';

@NgModule({
  declarations: [ControlValueAccesorDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ControlValueAccesorDirective],
})
export class SharedModule {}
