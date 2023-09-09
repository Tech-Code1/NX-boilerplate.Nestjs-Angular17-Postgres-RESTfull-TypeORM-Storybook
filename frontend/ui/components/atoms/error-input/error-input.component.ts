import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DefaultErrorMessages } from './error-input.interface';
@Component({
  standalone: true,
  selector: 'c-error-input',
  imports: [CommonModule, SharedModule],
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ErrorInputComponent {
  @Input() public controlName?: string;
  @Input() public formContained!: AbstractControl;

  listErrors!: string[] | null | void;

  get currentControl(): AbstractControl | null {
    if (this.formContained && this.controlName) {
      return this.formContained instanceof FormGroup
        ? this.formContained.get(this.controlName)
        : this.formContained;
    }
    return null;
  }

  private getErrorMessage(errors: Record<string, any>): string {
    const errorName = Object.keys(errors)[0];
    const errorFunction = DefaultErrorMessages[errorName];
    if (errorFunction) {
      return errorFunction(errors[errorName]);
    } else {
      return 'An error occurred';
    }
  }

  get error(): string {
    const errorMessage = this.currentControl?.errors
      ? this.getErrorMessage(this.currentControl?.errors)
      : '';
    return errorMessage;
  }
}
