import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '@types';
import { catchError, of, switchMap } from 'rxjs';
import { BaseResponse } from '../../../../common';
import { environment } from '../../../../environments/environment';
import { LoginAdapter } from '../../adapters';
import { ILoginData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private http = inject(HttpClient);
  BASE_API: string = environment.baseUrl;

  loginUser({ email, password }: ILoginData) {
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
}
