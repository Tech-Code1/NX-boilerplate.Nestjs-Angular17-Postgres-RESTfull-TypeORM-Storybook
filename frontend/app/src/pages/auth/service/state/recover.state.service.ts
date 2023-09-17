import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Swal } from '@utils';
import { take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IRegisterData } from '../../types';
import { RecoverApiService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class RecoverStateService {
  recoverService = inject(RecoverApiService);
  router = inject(Router);
  BASE_API: string = environment.baseUrl;

  onRecoverPassword(form: AbstractControl<IRegisterData>): void {
    const { email } = form.value;
    this.recoverService
      .recoverUser(email)
      .pipe(take(1))
      .subscribe({
        next: ({ data, response }) => {
          this.router.navigateByUrl('auth/login');
          Swal.success(response.message);
        },
        error: ({ response }) => {
          Swal.error(response.message);
        },
      });
  }
}
