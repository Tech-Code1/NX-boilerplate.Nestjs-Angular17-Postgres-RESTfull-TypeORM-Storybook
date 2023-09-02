import { Injectable, signal } from '@angular/core';
import { BaseResponse } from '@types';
import { Swal } from '@utils';
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
    console.log('exito desde base service', res);

    Swal.success(res.response.message);

    return this._success.set(res as BaseResponse<T>);
  };

  protected error = (error: BaseResponse) => {
    console.log('error desde base service', error);

    Swal.error(error.response.message);
    this._error.set(error);

    return throwError(() => error);
  };
}
