import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from '@utils';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'form-reset-pass',
  templateUrl: './form-reset-pass.component.html',
  styleUrls: ['./form-reset-pass.component.scss'],
})
export class FormResetPassComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  private passwordSubscription?: Subscription;
  private passwordSource = new BehaviorSubject<string | null>(null);
  formReset!: FormGroup;
  password$ = this.passwordSource.asObservable();

  get passwordControl(): FormControl {
    return this.formReset.get('password') as FormControl;
  }

  get passRepeatControl(): FormControl {
    return this.formReset.get('passRepeat') as FormControl;
  }

  ngOnInit(): void {
    this.formReset = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
      passRepeat: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
    });

    this.passwordSubscription = this.password$.subscribe((pass) => {
      const control = this.formReset.get('password');
      if (control) {
        control.setValidators([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          this.validatorsService.similarInputs(pass!, 'passRepeat'),
        ]);
        control.updateValueAndValidity();
      }
    });
  }

  ngOnDestroy(): void {
    this.passwordSubscription?.unsubscribe();
  }
}
