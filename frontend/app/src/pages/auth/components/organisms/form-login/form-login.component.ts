import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Swal } from '@utils';
import { BehaviorSubject, take } from 'rxjs';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  loginService = inject(LoginService);

  private passwordSource = new BehaviorSubject<string | null>(null);
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

  onSubmit() {
    if (this.formRegister.valid) {
      const { email, password } = this.formRegister.value;
      this.loginService
        .loginUser({ email, password })
        .pipe(take(1))
        .subscribe(
          ({ data, response }) => {
            Swal.success(response.message);
          },
          ({ response }) => {
            Swal.error(response.message);
          }
        );
    }
  }
}
