import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, IRevalidateTokenResponse, IUser } from '@types';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { BaseResponse } from '../../../../common';
import { environment } from '../../../../environments/environment';
import { LoginAdapter, RevalidateAdapter } from '../../adapters';
import { ILoginData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private http = inject(HttpClient);
  router = inject(Router);
  BASE_API: string = environment.baseUrl;

  loginUser({
    email,
    password,
  }: ILoginData): Observable<BaseResponse<ILogin | undefined>> {
    const body = { email, password };

    return this.http
      .post<BaseResponse<IUser | undefined>>(
        `${this.BASE_API}/auth/login`,
        body
      )
      .pipe(
        switchMap((res) => of(LoginAdapter(res))),
        catchError(({ error }) => {
          throw error;
        })
      );
  }

  checkAuthStatus(): Observable<
    BaseResponse<IRevalidateTokenResponse | undefined>
  > {
    const token = localStorage.getItem('token');
    const currentRoute = this.router.url;
    console.log('currentRoute:', this.router);

    if (currentRoute.includes('/auth/change-password')) {
      return of({
        data: {},
        response: {
          status: 202,
          code: 'ACCEPTED',
          success: true,
          message: 'Resetting Password',
        },
      });
    }

    if (!token) {
      return throwError(() => new Error('Token not found'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<BaseResponse<IUser | undefined>>(
        `${this.BASE_API}/auth/revalidate`,
        { headers }
      )
      .pipe(
        switchMap((res) => of(RevalidateAdapter(res))),
        catchError(({ error }) => {
          throw error;
        })
      );
  }
}
