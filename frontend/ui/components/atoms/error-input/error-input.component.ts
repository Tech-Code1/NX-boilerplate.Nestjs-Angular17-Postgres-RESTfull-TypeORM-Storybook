import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  BooleanValue,
  ErrorFunction,
  ErrorMessages,
} from './error-input.interface';

@Component({
  standalone: true,
  selector: 'c-error-input',
  imports: [CommonModule],
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorInputComponent {
  @Input()
  public formContained!: AbstractControl;

  @Input()
  public controlName?: string;

  listErrors!: string[] | null | void;

  private static readonly errorMessages: Record<string, ErrorFunction> = {
    required: () => ErrorMessages.EMPTY,
    email: () => ErrorMessages.INVALID_EMAIL,
    pattern: () => ErrorMessages.PATTERN,
    minlength: (booleanValue: BooleanValue = { requiredLength: 6 }) =>
      ErrorMessages.MIN_LENGTH(booleanValue),
    maxlength: (booleanValue: BooleanValue = { requiredLength: 50 }) =>
      ErrorMessages.MAX_LENGTH(booleanValue),
  };

  get currentControl(): AbstractControl | null {
    if (this.formContained && this.controlName) {
      if (this.formContained instanceof FormGroup) {
        return this.formContained.get(this.controlName);
      } else {
        return this.formContained;
      }
    }
    return null;
  }

  listOfErrors(): string[] {
    if (this.currentControl?.errors) {
      return Object.keys(this.currentControl?.errors)
        .map((field) => {
          const error = this.currentControl?.errors
            ? this.currentControl?.errors[field]
            : null;
          if (error) {
            return this.getMessage(field, error);
          }
          return '';
        })
        .filter(Boolean);
    }
    return [];
  }

  private getMessage(
    errorName: string,
    booleanValue?: any,
    controlName?: string
  ) {
    return ErrorInputComponent.errorMessages[errorName](
      booleanValue,
      controlName
    );
  }
}
