import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResponseService } from '@services';
import { catchError, of, switchMap, tap } from 'rxjs';
import { BaseResponse } from '../../../common';
import { environment } from '../../../environments/environment';
import { LoginAdapter } from '../adapters';
import { ILogin, ILoginData, IUser } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends ResponseService<ILogin> {
  private http = inject(HttpClient);
  BASE_API: string = environment.baseUrl;

  loginUser({ email, password }: ILoginData) {
    const body = { email, password };

    console.log(email, password);

    return this.http
      .post<BaseResponse<IUser | undefined>>(
        `${this.BASE_API}/auth/login`,
        body
      )
      .pipe(
        switchMap((res) => of(LoginAdapter(res))),
        tap((res) => this.success(res as BaseResponse<ILogin>)),
        catchError(({ error }) => {
          return this.error(error);
        })
      );
  }
}
