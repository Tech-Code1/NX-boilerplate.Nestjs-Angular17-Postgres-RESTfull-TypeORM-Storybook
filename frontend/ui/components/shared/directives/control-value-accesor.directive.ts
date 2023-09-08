import { Directive, Inject, Injector } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject, distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[customLabel]',
})
export class ControlValueAccesorDirective<T> implements ControlValueAccessor {
  constructor(@Inject(Injector) private injector: Injector) {}

  control: FormControl | undefined;
  isRequired = false;

  private _isDisabled = false;
  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;

  /* ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  } */

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
          break;
      }
    } catch (err) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    this.control
      ? this.control.setValue(value)
      : (this.control = new FormControl(value));
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(this.control.value),
        distinctUntilChanged(),
        tap((val) => fn(val))
      )
      .subscribe();
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;

    if (this.control) {
      isDisabled ? this.control.disable() : this.control.enable();
    }
  }

  /*
    const getformControl = this.injector.get(NgControl);

    const formGroup = this.injector
      .get(FormGroupDirective)
      .getControl(getformControl as FormControlName);

    const formControl = (getformControl as FormControlDirective)
      .form as FormControl; */

  isValid(): boolean {
    if (!this.control) {
      return true;
    }

    if (!this.control.touched) {
      return true;
    }

    return this.control.valid;
  }

  protected getValidatorsForType(type: string): ValidatorFn[] | null {
    switch (type) {
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

  get errorMessages(): string | null {
    if (!this.control?.errors) return null;

    if (this.control?.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (this.control?.hasError('email')) {
      return 'Introduce un email válido';
    }

    if (this.control?.hasError('pattern')) {
      return 'Introduce un número válido';
    }

    if (this.control?.hasError('minlength')) {
      return `El password debe tener al menos ${this.control.errors?.['minlength'].requiredLength} caracteres`;
    }

    return null;
  }
}
