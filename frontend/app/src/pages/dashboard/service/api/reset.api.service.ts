import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseResponse } from '@types';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IChangeData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ResetApiService {
  private http = inject(HttpClient);
  BASE_API: string = environment.baseUrl;

  resetPassword({
    currentPassword,
    newPassword,
  }: IChangeData): Observable<BaseResponse<object | undefined>> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('Token not found'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = { currentPassword, newPassword };

    return this.http
      .post<BaseResponse<IChangeData | undefined>>(
        `${this.BASE_API}/user/change-password`,
        body,
        { headers }
      )
      .pipe(
        switchMap((res) => of(res)),
        catchError(({ error }) => {
          throw error;
        })
      );
  }
}
