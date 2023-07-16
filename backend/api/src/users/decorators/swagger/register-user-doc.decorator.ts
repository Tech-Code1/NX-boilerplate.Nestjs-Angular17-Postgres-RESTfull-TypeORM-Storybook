import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO } from '../../dto';

export function RegisterUserDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiBody({ type: CreateUserDTO }),
    ApiResponse({
      status: 201,
      description: 'The user has been successfully created.',
    })
  );
}
