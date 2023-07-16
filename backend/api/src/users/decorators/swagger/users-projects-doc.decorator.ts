import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function UsersProjectsDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user with their projects by id' }),
    ApiResponse({
      status: 200,
      description: 'Return the user with their projects.',
    })
  );
}
