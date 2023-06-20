import { HttpException, HttpStatus } from '@nestjs/common';
import { statusMessages } from '../constants/errors';
import { IQueryFailedError } from '../interface/queryFailedError';

type errorType = string | Error | IQueryFailedError;
export class ErrorManager extends Error {
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message?: string;
  }) {
    super(`${type} :: ${message || statusMessages[type]}`);
  }

  public static createSignatureError(error: errorType) {
    let message, status;

    if (error instanceof Error || typeof error === 'string') {
      message = typeof error === 'string' ? error : error.message;
      const name = message.split(' :: ')[0];
      status = HttpStatus[name as keyof typeof HttpStatus];
    }

    if (typeof error !== 'string') {
      if ('detail' in error && 'code' in error) {
        message = error.detail;
        status = error.code;

        if (status && message) {
          message = `::code:${status}:: ${message}`;
        }
      }
    }

    if (!status) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    if (!message) {
      message = 'An unexpected error occurred';
    }

    throw new HttpException(message, status);
  }
}
