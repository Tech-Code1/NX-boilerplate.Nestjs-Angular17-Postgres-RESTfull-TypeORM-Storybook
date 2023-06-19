import { HttpException, HttpStatus } from '@nestjs/common';
import { statusMessages } from '../constants/errors';

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

  public static createSignatureError(error: string | Error) {
    const message = typeof error === 'string' ? error : error.message;
    const name = message.split(' :: ')[0];
    if (name) {
      throw new HttpException(
        message,
        HttpStatus[name as keyof typeof HttpStatus]
      );
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
