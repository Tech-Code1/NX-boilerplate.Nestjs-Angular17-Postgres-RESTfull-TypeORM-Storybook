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
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  private passwordSubscription?: Subscription;
  private passwordSource = new BehaviorSubject<string | null>(null);
  labelEmail = 'Email';
  labelPassword = 'Password';
  formRegister!: FormGroup;
  password$ = this.passwordSource.asObservable();

  get emailControl(): FormControl {
    return this.formRegister.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.formRegister.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
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
  }

  ngOnDestroy(): void {
    this.passwordSubscription?.unsubscribe();
  }
}
