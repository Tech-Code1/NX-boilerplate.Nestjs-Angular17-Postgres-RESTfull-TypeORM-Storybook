import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginStateService } from '../../../service/state';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginStateService);
  type!: string;

  formRegister!: FormGroup;

  get emailControl(): FormControl {
    return this.formRegister.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.formRegister.get('password') as FormControl;
  }

  get emailValidators(): ValidatorFn[] {
    const emailValidator = this.formRegister.get('email')?.validator;
    if (emailValidator) {
      return [emailValidator];
    }
    return [];
  }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.maxLength(10)]],
      password: [''],
    });
  }

  onSubmit() {
    if (!this.formRegister.valid) return;

    this.loginService.onSubmit(this.formRegister);
  }
}
