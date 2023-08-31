import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_API } from '@environments';
import { Observable, tap } from 'rxjs';
import { ILoginData, ILoginResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);

  loginResponse = signal<ILoginResponse>({
    login: {
      token: '',
      user: {
        id: '',
        email: '',
        isActive: false,
        isBlocked: false,
        roles: [],
        username: '',
        code: '',
        message: '',
        status: 0,
        success: false,
        token: '',
      },
    },
  });

  loginUser({ email, password }: ILoginData): Observable<ILoginResponse> {
    const body = { email, password };

    console.log(email, password);

    return this.http
      .post<ILoginResponse>(BASE_API, body)
      .pipe(tap((res) => this.loginResponse.set(res)));
  }
}
