import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Swal } from '@utils';
import { take } from 'rxjs';
import { ILoginData } from '../../types';
import { LoginApiService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class LoginStateService {
  loginService = inject(LoginApiService);

  onSubmit(form: AbstractControl<ILoginData>): void {
    const { email, password } = form.value;
    this.loginService
      .loginUser({ email, password })
      .pipe(take(1))
      .subscribe({
        next: ({ data, response }) => {
          Swal.success(response.message);
        },
        error: ({ response }) => {
          Swal.error(response.message);
        },
      });
  }
}
