import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function UserDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user by id' }),
    ApiResponse({ status: 200, description: 'Return the user.' })
  );
}
