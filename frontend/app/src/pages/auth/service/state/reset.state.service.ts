import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Swal } from '@utils';
import { take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IResetData } from '../../types';
import { ResetApiService } from '../api/reset.api.service';

@Injectable({
  providedIn: 'root',
})
export class ResetStateService {
  router = inject(Router);
  resetService = inject(ResetApiService);
  BASE_API: string = environment.baseUrl;

  onResetPassword(
    form: AbstractControl<IResetData>,
    token: string,
    id: string
  ): void {
    const { password } = form.value;

    this.resetService
      .resetPassword({ id, token, password })
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
