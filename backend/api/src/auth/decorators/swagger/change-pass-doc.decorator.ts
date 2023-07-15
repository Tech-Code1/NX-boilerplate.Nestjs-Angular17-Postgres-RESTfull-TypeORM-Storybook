import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChangePassDTO } from '../../dto';

export function ChangePassDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Change user password.' }),
    ApiResponse({
      status: 200,
      description: 'The password has been successfully changed.',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    }),
    ApiResponse({
      status: 401,
      description: 'Invalid or expired password reset token.',
    }),
    ApiBody({
      type: ChangePassDTO,
      description: 'User Change Password details',
    })
  );
}
