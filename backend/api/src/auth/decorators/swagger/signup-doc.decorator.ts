import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthDTO } from '../../dto';

export function SignupDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Sign up a new user.' }),
    ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
    }),
    ApiBody({ type: AuthDTO, description: 'User Registration details' })
  );
}
