import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function BlockUserDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Block a user' }),
    ApiResponse({
      status: 200,
      description: 'The user has been successfully blocked.',
    })
  );
}
