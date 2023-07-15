import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function RevalidateDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Revalidate token.' }),
    ApiResponse({
      status: 200,
      description: 'The token has been successfully revalidated.',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })
  );
}
