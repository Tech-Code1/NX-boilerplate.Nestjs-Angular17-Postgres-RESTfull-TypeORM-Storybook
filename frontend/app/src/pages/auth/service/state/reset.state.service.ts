import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ResetApiService } from '../api/reset.api.service';

@Injectable({
  providedIn: 'root',
})
export class ResetStateService {
  router = inject(Router);
  resetService = inject(ResetApiService);
  BASE_API: string = environment.baseUrl;

  /* onResetPassword(form: AbstractControl<IResetData>): void {



    if (userId && token) {
      this.resetService
        .resetPassword({ userId, token, password })
        .pipe(take(1))
        .subscribe({
          next: ({ data, response }) => {
            this.router.navigateByUrl('/dashboard');
            Swal.success(response.message);
          },
          error: ({ response }) => {
            Swal.error(response.message);
          },
        });
    } */
}
