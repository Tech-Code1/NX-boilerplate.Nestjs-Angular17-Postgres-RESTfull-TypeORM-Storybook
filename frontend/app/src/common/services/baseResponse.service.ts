import { Injectable, signal } from '@angular/core';
import { BaseResponse } from '@types';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponseService<T> {
  _success = ResponseService.responseSuccess<T>();
  _error = ResponseService.responseError();

  static responseSuccess<T>() {
    return signal<BaseResponse<T>>({
      data: {} as T,
      response: {
        status: 0,
        code: '',
        success: true,
        message: '',
      },
    } as BaseResponse<T>);
  }

  static responseError() {
    return signal<BaseResponse>({
      data: {},
      response: {
        status: 0,
        code: '',
        success: false,
        message: '',
      },
    });
  }

  protected success = (res: BaseResponse<T>) => {
    const response = this._success.set(res as BaseResponse<T>);

    return response;
  };

  protected error = (error: BaseResponse) => {
    const response = this._error.set(error);

    return throwError(() => response);
  };
}
