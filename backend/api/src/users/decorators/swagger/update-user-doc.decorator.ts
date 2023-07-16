import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDTO } from '../../dto';

export function UpdateUserDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a user' }),
    ApiBody({ type: UpdateUserDTO }),
    ApiResponse({
      status: 200,
      description: 'The user has been successfully updated.',
    })
  );
}
