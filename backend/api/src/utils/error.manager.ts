import { HttpException, HttpStatus } from '@nestjs/common';
import { statusMessages } from '../constants/errors';
import { errorType } from '../interface/typeErrorCustom';
export class ErrorManager extends Error {
  public static createError(error: errorType, type?: keyof typeof HttpStatus) {
    let message, status, code, success;

    if (
      typeof error === 'object' &&
      'type' in error &&
      !('detail' in error) &&
      !('code' in error)
    ) {
      type = error.type;
      status = HttpStatus[type];

      if ('message' in error) {
        message = typeof error === 'string' ? error : error.message;
      } else {
        message = statusMessages[type];
      }
    }

    if (error instanceof Error || typeof error === 'string') {
      message = typeof error === 'string' ? error : error.message;
      const name = message.split(' :: ')[0];
      status = HttpStatus[name as keyof typeof HttpStatus];
    }

    if (typeof error !== 'string') {
      if ('detail' in error && 'code' in error) {
        let errorCode!: any;
        errorCode = error.code;
        message = error.detail;

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

    // *? Error handling without GraphQL
    //throw new HttpException(message, status);

    if (status) {
      success = status >= 200 && status < 300;
    }

    if (error instanceof HttpException) {
      const errorResponse = error.getResponse() as {
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

    throw new HttpException(
      {
        status,
        error: message,
        code: code || 'INTERNAL_SERVER_ERROR',
        success,
      },
      status
    );
  }
}
