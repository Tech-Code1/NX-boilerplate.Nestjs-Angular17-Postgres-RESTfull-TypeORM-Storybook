import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { BaseResponse } from '../../../../common';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecoverApiService {
  private http = inject(HttpClient);
  BASE_API: string = environment.baseUrl;

  recoverUser(email: string): Observable<BaseResponse<string | undefined>> {
    const body = { email };

    return this.http
      .post<BaseResponse<string | undefined>>(
        `${this.BASE_API}/auth/recover`,
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
