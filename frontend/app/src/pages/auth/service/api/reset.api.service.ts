import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseResponse } from '@types';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IResetData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ResetApiService {
  private http = inject(HttpClient);
  BASE_API: string = environment.baseUrl;

  resetPassword({
    id,
    token,
    password,
  }: IResetData): Observable<BaseResponse<object | undefined>> {
    const body = { id, token, password };

    return this.http
      .post<BaseResponse<IResetData | undefined>>(
        `${this.BASE_API}/auth/change-password`,
        body
      )
      .pipe(
        switchMap((res) => of(res)),
        catchError(({ error }) => {
          throw error;
        })
      );
  }
}
