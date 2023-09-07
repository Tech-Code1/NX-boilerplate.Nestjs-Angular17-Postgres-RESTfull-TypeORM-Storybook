import { Injectable, computed, inject, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, IRevalidateTokenResponse } from '@types';
import { Swal } from '@utils';
import { of, take } from 'rxjs';
import { environment } from '../../../../environments/environment';
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
  BASE_API: string = environment.baseUrl;

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.loginService.checkAuthStatus().subscribe({
      next: ({ data, response }) => {
        this.setAuthtication(data);

        return true;
      },
      error: () => {
        this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);
        return of(false);
      },
    });
  }

  private setAuthtication(
    data: (object | IRevalidateTokenResponse) | (object | ILogin)
  ): boolean {
    this._currentUser.set(data);
    this._authStatus.set(AuthStatus.AUTHENTICATED);

    if ('token' in data) {
      localStorage.setItem('token', data.token);
    }

    return true;
  }

  onSubmit(form: AbstractControl<ILoginData>): void {
    const { email, password } = form.value;
    this.loginService
      .loginUser({ email, password })
      .pipe(take(1))
      .subscribe({
        next: ({ data, response }) => {
          this.setAuthtication(data);

          this.router.navigateByUrl('/dashboard');
          Swal.success(response.message);
        },
        error: ({ response }) => {
          Swal.error(response.message);
        },
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.set({});
    this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);
  }
}
