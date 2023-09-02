import { HttpException, HttpStatus } from '@nestjs/common';
import { statusMessages } from '../constants/errors';
import { errorType } from '../interface';

export class Resp extends Error {
  public static Error(
    error: errorType,
    type: keyof typeof HttpStatus = 'INTERNAL_SERVER_ERROR',
    customMessage?: string
  ) {
    throw this.createException(error, type, false, customMessage);
  }

  public static Success<T>(data: T, type?: keyof typeof HttpStatus) {
    return this.createResponse<T>(data, type, true);
  }

  private static determineErrorMessage(
    error: errorType,
    customMessage?: string
  ): string {
    let message = customMessage || 'An unexpected error occurred';

    if (error instanceof HttpException) {
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else if ('type' in error) {
      message =
        error.additionalProperty || statusMessages[error.type] || message;
    } else if ('code' in error && 'detail' in error) {
      console.log(`${error.code}: ${error.detail}`);

      message = `${error.code} ${customMessage || error.detail}`;
    }

    return message;
  }

  private static createResponse<T>(
    data: T,
    type: keyof typeof HttpStatus,
    isSuccess: boolean,
    customMessage?: string
  ) {
    const status = HttpStatus[type];
    const defaultMessage = statusMessages[type];
    const message = customMessage || defaultMessage || 'Unknown Success';
    const response = {
      status,
      message,
      code: type,
      success: isSuccess,
      data: isSuccess ? data : {},
    };

    return isSuccess ? response : new HttpException(response, status);
  }

  private static createException(
    error: errorType,
    type: keyof typeof HttpStatus,
    isSuccess: boolean,
    customMessage?: string
  ) {
    const status = HttpStatus[type];
    const message = this.determineErrorMessage(error, customMessage);
    const response = {
      status,
      message,
      code: type,
      success: isSuccess,
      data: {},
    };

    return isSuccess ? response : new HttpException(response, status);
  }
}
