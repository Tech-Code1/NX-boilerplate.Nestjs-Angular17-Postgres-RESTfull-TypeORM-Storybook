import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ResetPassDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Request a password reset.' }),
    ApiResponse({
      status: 200,
      description: 'The password reset email has been sent.',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    }),
    ApiBody({
      type: String,
      description: 'Email of the user whose password you want to change.',
    })
  );
}
