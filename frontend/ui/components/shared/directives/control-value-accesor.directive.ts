import {
  DestroyRef,
  Directive,
  Inject,
  Injector,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, startWith, tap } from 'rxjs';

@Directive({
  selector: '[customLabel]',
})
export class ControlValueAccesorDirective<T>
  implements ControlValueAccessor, OnInit
{
  constructor(@Inject(Injector) private injector: Injector) {}
  destroyRef: DestroyRef = inject(DestroyRef);
  control: FormControl | undefined;
  isRequired = false;
  private _isDisabled = false;
  private _onTouched!: () => T;

  ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

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
      : (this.control = this.control = new FormControl(value));
  }

  registerOnChange(fn: (value: string) => void): void {
    // this.onChange = fn;
  }

  registerOnTouched(fn: (val: T | null) => T): void {
    this.control?.valueChanges
      .pipe(
        takeUntilDestroyed(),
        startWith(this.control.value),
        distinctUntilChanged(),
        tap((val) => fn(val))
      )
      .subscribe(() => this.control?.markAllAsTouched());
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  /* isFormControl(): boolean {
    return !!this.formControl;
  } */

  /* isValid(inputName: string): boolean {
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
  } */
}
