import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorInputComponent } from '../../atoms/error-input/error-input.component';
import { ControlValueAccesorDirective } from '../../shared/directives/control-value-accesor.directive';
import { InputType } from './input.interface';

@Component({
  standalone: true,
  selector: 'c-input',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorInputComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<T>
  extends ControlValueAccesorDirective<T>
  implements InputType, OnInit
{
  @Input() id = '';
  @Input() type!: InputType['type'];
  @Input() css: InputType['css'] = 'input-primary';
  @Input() placeholder?: string | undefined;
  @Input() value?: string | number | undefined;
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() name!: string;

  /* override ngOnInit(): void {
    this.getValidatorsForType(this.type);
  } */

  ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;

    const validators = this.getValidatorsForType(this.type);

    if (this.control && validators) {
      this.control.setValidators(validators);
      this.control.updateValueAndValidity();
    }
  }
}
