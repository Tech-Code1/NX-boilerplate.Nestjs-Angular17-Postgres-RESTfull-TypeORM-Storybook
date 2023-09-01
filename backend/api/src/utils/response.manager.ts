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
    return this.createResponse({ data }, type, true);
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
    }

    return message;
  }

  private static createResponse<T>(
    payload: any,
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
      success: isSuccess,
      data: isSuccess ? payload : {},
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
      success: isSuccess,
      data: {},
    };

    return isSuccess ? response : new HttpException(response, status);
  }
}

/* import { HttpException, HttpStatus } from '@nestjs/common';
import { statusMessages } from '../constants/errors';
import { errorType } from '../interface/typeErrorCustom';

export class ResponseManager extends Error {
  public static Error(error: errorType, type?: keyof typeof HttpStatus) {
    throw this.handleResponse(error, type, false);
  }

  public static Success<T>(data: T, type?: keyof typeof HttpStatus) {
    return this.handleResponse({ data }, type, true);
  }

  public static handleResponse<T>(
    payload: errorType | { data: T },
    type?: keyof typeof HttpStatus,
    isSuccess?: boolean
  ) {
    let message: string,
      status: number,
      code,
      success: boolean,
      data: Object | undefined;

    if (isSuccess) {
      success = true;
    }

    if (
      typeof payload === 'object' &&
      'type' in payload &&
      !('detail' in payload) &&
      !('code' in payload)
    ) {
      type = payload.type;
      status = HttpStatus[type];

      if ('message' in payload) {
        message =
          typeof payload === 'string' ? payload : (payload.message as string);
      } else {
        message = statusMessages[type];
      }
    }

    if (payload instanceof Error || typeof payload === 'string') {
      message = typeof payload === 'string' ? payload : payload.message;
      const name = message.split(' :: ')[0];
      status = HttpStatus[name as keyof typeof HttpStatus];
    }

    if (typeof payload !== 'string') {
      if ('detail' in payload && 'code' in payload) {
        let errorCode!: any;
        errorCode = payload.code;
        message = payload.detail as string;

        if (message) {
          message = `::error-${errorCode}:: ${message}`;
        }
      }
    }

    if (type) {
      status = HttpStatus[type as keyof typeof HttpStatus];
      code = type;
      if (!message) {
        message = statusMessages[type];
      }
    }

    if (!status) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      console.log('No status yet, setting to INTERNAL_SERVER_ERROR');
    }

    if (!message) {
      message = 'An unexpected error occurred';
    }

    if (status) {
      success = status >= 200 && status < 300;
    }

    if (payload instanceof HttpException) {
      const errorResponse = payload.getResponse() as {
        status?: number;
        error?: string;
        code?: string;
        success?: boolean;
      };
      status = errorResponse.status;
      message = errorResponse.error;
      code = errorResponse.code;
      success = errorResponse.success;
    }

    if (typeof payload === 'object' && payload !== null && 'data' in payload) {
      data = isSuccess ? { data: payload.data } : { data: {} };
    } else {
      data = { data: {} };
    }

    return new HttpException(
      {
        data,
        response: {
          status: status || 0,
          message: message || 'Unknown error',
          code: code || 'INTERNAL_SERVER_ERROR',
          success: success || false,
        },
      },
      status
    );
  }
} */
