import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteUserDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a user' }),
    ApiResponse({
      status: 200,
      description: 'The user has been successfully deleted.',
    })
  );
}
