import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ValidatorsService } from '../../../../utils';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  private passwordSubscription?: Subscription;
  private passwordSource = new BehaviorSubject<string | null>(null);
  labelEmail = 'Email';
  labelPassword = 'Password';
  formLogin!: FormGroup;
  password$ = this.passwordSource.asObservable();

  get emailControl(): FormControl {
    return this.formLogin.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
    });

    this.passwordSubscription = this.password$.subscribe((pass) => {
      const control = this.formLogin.get('password');
      if (control) {
        control.setValidators([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          this.validatorsService.similarInputs(pass!, 'password'),
        ]);
        control.updateValueAndValidity();
      }
    });
  }

  ngOnDestroy(): void {
    this.passwordSubscription?.unsubscribe();
  }
}
