import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ILogin } from '@types';
import { Observable, of, switchMap, tap } from 'rxjs';
import { BaseResponse } from '../../../common';
import { environment } from '../../../environments/environment';
import { LoginAdapter } from '../adapters';
import { ILoginData, IUser } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  BASE_API: string = environment.baseUrl;
  /* private router = inject(Router); */

  loginResponseOk = signal<BaseResponse<ILogin>>({
    data: {
      token: '',
      user: {
        id: '',
        email: '',
        isActive: false,
        isBlocked: false,
        roles: [],
        username: '',
      },
    },
    response: {
      code: '',
      message: '',
      status: 0,
      success: false,
    },
  });

  loginResponseError = signal<BaseResponse>({
    data: {},
    response: {
      code: '',
      message: '',
      status: 0,
      success: false,
    },
  });

  loginUser({
    email,
    password,
  }: ILoginData): Observable<BaseResponse<IUser | undefined>> {
    const body = { email, password };

    console.log(email, password);

    return this.http
      .post<BaseResponse<IUser | undefined>>(
        `${this.BASE_API}/auth/login`,
        body
      )
      .pipe(
        switchMap((res) => of(LoginAdapter(res))),
        tap((res) => {
          console.log('response after adapter: *:', res);

          return res.response.success
            ? this.loginResponseOk.set(res as BaseResponse<ILogin>)
            : this.loginResponseError.set(res as BaseResponse);
        })
      );
  }
}
