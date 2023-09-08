import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BooleanValue, ErrorFunction } from './error-input.interface';

const DefaultErrorMessages: Record<string, ErrorFunction> = {
  required: () => 'The field is required',
  email: () => 'Email address is not valid!',
  pattern: () => 'The field does not have a valid format.',
  minlength: (booleanValue: BooleanValue = { requiredLength: 6 }) =>
    `The field must have at least ${booleanValue.requiredLength} characters.`,
  maxlength: (booleanValue: BooleanValue = { requiredLength: 50 }) =>
    `The field must have a maximum of ${booleanValue.requiredLength} characters.`,
  // ... other errors can be added here
};
@Component({
  standalone: true,
  selector: 'c-error-input',
  imports: [CommonModule, SharedModule],
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private getErrorMessages(errors: Record<string, any>): string[] {
    return Object.keys(errors)
      .map((errorName) => this.getMessage(errorName, errors[errorName]))
      .filter(Boolean);
  }

  listOfErrors(): string[] {
    return this.currentControl?.errors
      ? this.getErrorMessages(this.currentControl?.errors)
      : [];
  }

  private getMessage(
    errorName: string,
    errorValue: any,
    controlName?: string
  ): string {
    const errorFunction = DefaultErrorMessages[errorName];
    if (errorFunction) {
      return errorFunction(errorValue, controlName);
    } else {
      return 'An error occurred';
    }
  }
}
