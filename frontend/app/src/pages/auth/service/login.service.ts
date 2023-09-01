import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
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

  loginResponseOk = signal<BaseResponse<IUser>>({
    data: {
      id: '',
      email: '',
      isActive: false,
      isBlocked: false,
      roles: [],
      username: '',
      token: '',
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
      .post<BaseResponse<IUser | undefined>>(this.BASE_API, body)
      .pipe(
        switchMap((res) => of(LoginAdapter(res))),
        tap((res) =>
          res.response.success
            ? this.loginResponseOk.set(res as BaseResponse<IUser>)
            : this.loginResponseError.set(res as BaseResponse)
        )
      );
  }
}
