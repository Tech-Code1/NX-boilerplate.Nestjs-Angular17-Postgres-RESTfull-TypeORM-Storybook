import { HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { IQueryFailedError } from './queryFailedError';

export type errorType =
  | string
  | Object
  | Error
  | IQueryFailedError
  | EntityNotFoundError
  | GraphQLError
  | { type: keyof typeof HttpStatus; additionalProperty: string };
