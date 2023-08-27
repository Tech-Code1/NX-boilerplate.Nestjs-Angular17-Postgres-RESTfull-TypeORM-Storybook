import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  ViewEncapsulation,
  forwardRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { debounceTime, noop, tap } from 'rxjs';
import { ErrorInputComponent } from '../../atoms/error-input/error-input.component';
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
export class InputComponent implements ControlValueAccessor, OnInit, InputType {
  destroyRef: DestroyRef = inject(DestroyRef);

  @Input()
  name!: string;

  @Input()
  placeholder?: string | undefined;

  @Input()
  css!: InputType['css'];

  @Input()
  type: InputType['type'] = 'text';

  @Input()
  value?: string | number | undefined;

  @Input()
  id?: string | undefined;

  @Input() formGroup?: FormGroup;

  @Input() formControl: FormControl = new FormControl();

  private _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this.setDisabledState(value);
  }

  get control(): AbstractControl | null {
    if (this.formGroup) {
      return this.formGroup.controls[this.name];
    }
    return this.formControl || null;
  }

  //Validators
  private getValidatorsForType(): ValidatorFn[] | null {
    switch (this.type) {
      case 'email':
        return [Validators.required, Validators.email];
      case 'number':
        return [Validators.pattern(/^[0-9]*$/), Validators.required];
      case 'password':
        return [Validators.required, Validators.minLength(6)];
      case 'text':
      default:
        return [Validators.required];
    }
  }

  ngOnInit(): void {
    if (this.control) {
      this.control.setValidators(this.getValidatorsForType());
      this.control.updateValueAndValidity();

      this.control.valueChanges
        .pipe(
          debounceTime(200),
          tap((value) => this.onChange(value)),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    }
  }

  // ControlValueAccessor methods
  onChange: (value: string) => void = noop;
  onTouch: () => void = noop;

  writeValue(value: string): void {
    if (this.control) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.control) {
      isDisabled ? this.control.disable() : this.control.enable();
    }
  }

  isFormControl(): boolean {
    return !!this.formControl;
  }

  isValid(inputName: string): boolean {
    if (this.formControl) {
      return this.formControl.touched ? this.formControl.valid : true;
    }
    if (this.formGroup) {
      const control = this.formGroup.get(inputName);
      if (control?.touched) {
        return control.valid;
      }
    }
    return true;
  }
}
