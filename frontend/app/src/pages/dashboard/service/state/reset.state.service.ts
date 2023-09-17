import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Swal } from '@utils';
import { take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IChangeData } from '../../types';
import { ResetApiService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class ResetStateService {
  resetService = inject(ResetApiService);
  router = inject(Router);
  BASE_API: string = environment.baseUrl;

  onResetPassword(form: AbstractControl<IChangeData>): void {
    const { currentPassword, newPassword } = form.value;

    this.resetService
      .resetPassword({ currentPassword, newPassword })
      .pipe(take(1))
      .subscribe({
        next: ({ data, response }) => {
          this.router.navigateByUrl('/dashboard');
          Swal.success(response.message, true);
        },
        error: ({ response }) => {
          Swal.error(response.message);
        },
      });
  }
}
