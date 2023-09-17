import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { BaseResponse } from '../../../../common';
import { environment } from '../../../../environments/environment';
import { RegisterAdapter } from '../../adapters';
import { ILogin, IRegisterData, IUser } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class RegisterApiService {
  private http = inject(HttpClient);
  BASE_API: string = environment.baseUrl;

  registerUser({
    email,
    username,
    password,
  }: IRegisterData): Observable<BaseResponse<ILogin | undefined>> {
    const body = { email, username, password };

    return this.http
      .post<BaseResponse<IUser | undefined>>(
        `${this.BASE_API}/user/register`,
        body
      )
      .pipe(
        switchMap((res) => of(RegisterAdapter(res))),
        catchError(({ error }) => {
          throw error;
        })
      );
  }
}
