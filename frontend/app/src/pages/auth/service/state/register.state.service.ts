import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Swal } from '@utils';
import { take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IRegisterData } from '../../types';
import { RegisterApiService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class RegisterStateService {
  registerService = inject(RegisterApiService);
  router = inject(Router);
  BASE_API: string = environment.baseUrl;

  onRegister(form: AbstractControl<IRegisterData>): void {
    const { username, email, password } = form.value;
    this.registerService
      .registerUser({ username, email, password })
      .pipe(take(1))
      .subscribe({
        next: ({ data, response }) => {
          this.router.navigateByUrl('auth/login');
          Swal.success(response.message, true);
        },
        error: ({ response }) => {
          Swal.error(response.message);
        },
      });
  }
}
