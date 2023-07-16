import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { IQueryFailedError } from './queryFailedError';

export type errorType =
  | string
  | Object
  | Error
  | IQueryFailedError
  | EntityNotFoundError
  | HttpException
  | { type: keyof typeof HttpStatus; additionalProperty: string };
