import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function UsersProjectsDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve all users-projects associations' }),
    ApiResponse({
      status: 401,
      description: 'The user is not authorized or has an invalid token.',
    }),
    ApiResponse({
      status: 200,
      description: 'Query all users along with projects.',
    })
  );
}
