import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateTaskDTO } from '../../dto';

export function CreateTaskDoc() {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'The task has been successfully created.',
      type: CreateTaskDTO,
    }),
    ApiInternalServerErrorResponse({ description: 'Http Exception' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
    ApiBadRequestResponse({
      description: 'The project with the id does not exist: <idProject>.',
    }),
    ApiOperation({ summary: 'Create a new task' }),
    ApiBody({ type: CreateTaskDTO, description: 'Task details' })
  );
}
