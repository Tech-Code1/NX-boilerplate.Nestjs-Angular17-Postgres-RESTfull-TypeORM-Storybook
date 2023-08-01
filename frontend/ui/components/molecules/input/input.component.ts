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
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, noop, tap } from 'rxjs';
import { InputType } from './input.interface';

@Component({
  standalone: true,
  selector: 'c-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
  @Input()
  name?: string | undefined;

  @Input()
  placeholder?: string | undefined;

  @Input()
  css!: 'input-primary' | 'input-secondary' | 'input-tertiary';

  @Input()
  type: 'number' | 'text' | 'email' | 'password' = 'text';

  @Input()
  value?: string | number | undefined;

  @Input()
  id?: string | undefined;

  @Input()
  errors?: string | undefined;

  @Input()
  isDisabled = false;

  formControl: FormControl = new FormControl<string>('');
  destroyRef: DestroyRef = inject(DestroyRef);
  onChange: (value: string) => void = noop;
  onTouch: () => void = noop;

  private _disabled = false;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this.setDisabledState(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  writeValue(value: string): void {
    this.formControl.setValue(value, { emitEvent: false });
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(200),
        tap((value) => this.onChange(value)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
