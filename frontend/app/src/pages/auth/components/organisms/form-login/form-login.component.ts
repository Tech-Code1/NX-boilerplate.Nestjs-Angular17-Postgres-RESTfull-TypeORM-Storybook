import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
  loginService = inject(LoginStateService);

  formRegister!: FormGroup;

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

  onSubmit() {
    if (!this.formRegister.valid) return;

    this.loginService.onSubmit(this.formRegister);
  }
}
