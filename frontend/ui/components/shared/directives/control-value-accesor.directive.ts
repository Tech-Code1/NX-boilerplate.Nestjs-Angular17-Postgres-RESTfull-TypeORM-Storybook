import {
  Directive,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  standalone: true,
  selector: '[customLabel]',
})
export class ControlValueAccesorDirective<T>
  implements ControlValueAccessor, OnChanges, OnInit
{
  constructor(@Inject(Injector) private injector: Injector) {}

  @Input() type: 'number' | 'text' | 'email' | 'password' = 'text';
  @Input() additionalValidators: ValidatorFn[] = [];

  control: FormControl | undefined;
  protected _isDisabled!: boolean;
  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;

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

  updateValidators(): void {
    if (this.control) {
      const typeValidators = this.getValidatorsForType(this.type) || [];
      const combinedValidators = [
        ...typeValidators,
        ...this.additionalValidators,
      ];
      this.control.setValidators(combinedValidators);
      this.control.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.setFormControl();
    this.updateValidators();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['type'] ||
      (changes?.['additionalValidators'] && this.control)
    ) {
      this.updateValidators();
    }
  }

  // ? Debug
  /* observeValueChanges() {
    if (this.control) {
      this.control.valueChanges.subscribe(() => {
        this.getValidatorsForType(this.type);
        console.log('additionalValidators', this.additionalValidators);

        console.log('Errores después de cambio:', this.control!.errors);
      });
    }
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
      this.setDisabledState(this._isDisabled);
    } catch (err) {
      this.control = new FormControl();
    }

    // ? Debug
    //this.observeValueChanges();
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

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;

    if (this.control) {
      isDisabled ? this.control.disable() : this.control.enable();
    }
  }

  protected isValid(): boolean {
    if (!this.control) {
      return true;
    }

    if (!this.control.touched) {
      return true;
    }

    return this.control.valid;
  }
}
