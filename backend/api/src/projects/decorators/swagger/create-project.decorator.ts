import { UsersProjects } from '@db/entities';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateProjectDTO } from '../../dto';

export function CreateProjectDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Create project and assign access level to user' }),
    ApiBody({ type: CreateProjectDTO }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiCreatedResponse({
      description: 'The project has been successfully created.',
      type: UsersProjects,
    })
  );
}
