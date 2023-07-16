import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function UsersDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all users' }),
    ApiResponse({ status: 200, description: 'Return all users.' })
  );
}
