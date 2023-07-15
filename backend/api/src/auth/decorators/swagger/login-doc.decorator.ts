import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDTO } from '../../dto';

export function LoginDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Log in a user.' }),
    ApiResponse({
      status: 200,
      description: 'The user has been successfully logged in.',
    }),
    ApiResponse({
      status: 400,
      description: 'Your password or email are incorrect',
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({
      status: 404,
      description: '::error-database:: <email> not found',
    }),
    ApiBody({ type: LoginDTO, description: 'User Login details' })
  );
}
