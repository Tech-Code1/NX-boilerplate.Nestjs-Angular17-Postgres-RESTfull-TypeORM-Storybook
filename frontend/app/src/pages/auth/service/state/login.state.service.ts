import { Injectable, computed, inject, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '@types';
import { Swal } from '@utils';
import { take } from 'rxjs';
import { AuthStatus, ILoginData } from '../../types';
import { LoginApiService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class LoginStateService {
  loginService = inject(LoginApiService);
  router = inject(Router);
  private _currentUser = signal<ILogin | object>({});
  private _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  onSubmit(form: AbstractControl<ILoginData>): void {
    const { email, password } = form.value;
    this.loginService
      .loginUser({ email, password })
      .pipe(take(1))
      .subscribe({
        next: ({ data, response }) => {
          this._currentUser.set(data);
          this._authStatus.set(AuthStatus.AUTHENTICATED);

          if ('token' in data) {
            localStorage.setItem('token', data.token);
          }

          this.router.navigateByUrl('/dashboard');
          Swal.success(response.message);
        },
        error: ({ response }) => {
          Swal.error(response.message);
        },
      });
  }
}
