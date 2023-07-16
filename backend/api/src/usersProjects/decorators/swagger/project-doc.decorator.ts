import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function ProjectDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve all projects associated with a specific user ID',
    }),
    ApiParam({ name: 'id', required: true, description: 'The ID of the user' }),
    ApiResponse({
      status: 500,
      description: 'Internal server error.',
    }),
    ApiResponse({
      status: 404,
      description: 'The user is not found in any project.',
    }),
    ApiResponse({
      status: 401,
      description: 'The user is not authorized or has an invalid token.',
    }),
    ApiResponse({
      status: 200,
      description: 'Query a specific project by its id.',
    })
  );
}
