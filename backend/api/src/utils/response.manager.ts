import { HttpException, HttpStatus } from '@nestjs/common';
import { statusMessages } from '../constants/errors';
import { errorType } from '../interface';

export class Resp extends Error {
  public static Error(
    type: keyof typeof HttpStatus = 'INTERNAL_SERVER_ERROR',
    error?: errorType,
    customMessage?: string
  ) {
    throw this.createException(error, type, false, customMessage);
  }

  public static Success<T>(
    data: T,
    type?: keyof typeof HttpStatus,
    customMessage?: string
  ) {
    const response = this.createResponse<T>(data, type, true, customMessage);
    return { data, ...response };
  }

  private static determineErrorMessage(
    error?: errorType,
    customMessage?: string
  ): string {
    let message = customMessage || 'An unexpected error occurred';

    // * Handle HttpException
    if (error instanceof HttpException) {
      message = error.message;

      // * Handle standard Error
    } else if (error instanceof Error) {
      message = error.message;

      // * Handle string errors
    } else if (typeof error === 'string') {
      message = error;

      // * Handle custom error object with code and detail fields
    } else if ('code' in error && 'detail' in error) {
      message = `::error-${error.code || 'An unexpected error occurred'} ${
        customMessage || error.detail
      }`;
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
    const message = error
      ? this.determineErrorMessage(error, customMessage)
      : statusMessages[type];
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
