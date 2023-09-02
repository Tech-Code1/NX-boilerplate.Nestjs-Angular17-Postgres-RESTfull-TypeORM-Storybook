import { Injectable, signal } from '@angular/core';
import { BaseResponse } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
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

  static success<T>(res: BaseResponse<T>) {
    console.log('exito desde base service', res);
    const response = ResponseService.responseSuccess<T>();

    return response.set(res);
  }

  static error(res: BaseResponse) {
    console.log('error desde base service', res);

    const response = ResponseService.responseError();

    return response.set(res);
  }
}
