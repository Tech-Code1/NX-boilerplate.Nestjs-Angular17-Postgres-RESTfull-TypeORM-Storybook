import { HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { statusMessages } from '../constants/errors';
import { errorType } from '../interface/typeErrorCustom';
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

  public static createSignatureError(
    error: errorType,
    type?: keyof typeof HttpStatus
  ) {
    let message, status;

    if (error instanceof Error || typeof error === 'string') {
      message = typeof error === 'string' ? error : error.message;
      const name = message.split(' :: ')[0];
      status = HttpStatus[name as keyof typeof HttpStatus];
    }

    if (typeof error !== 'string') {
      if ('detail' in error && 'code' in error) {
        const errorCode: string = error.code;
        message = error.detail;

        if (message) {
          message = `::error-${errorCode}:: ${message}`;
        }
      }
    }

    if (type) {
      status = HttpStatus[type as keyof typeof HttpStatus];
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
    const success = status >= 200 && status < 300;
    const code = type ? type : 'INTERNAL_SERVER_ERROR';

    // *? Error handling without GraphQL
    //throw new HttpException(message, status);

    throw new GraphQLError(message, {
      extensions: {
        status,
        code,
        success,
      },
    });
  }
}
