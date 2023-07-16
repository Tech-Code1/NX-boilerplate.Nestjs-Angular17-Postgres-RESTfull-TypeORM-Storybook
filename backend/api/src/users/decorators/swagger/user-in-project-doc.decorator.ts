import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserToProjectDTO } from '../../dto';

export function UserInProjectDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Add user to a project' }),
    ApiBody({ type: UserToProjectDTO }),
    ApiResponse({
      status: 200,
      description: 'The user has been successfully added to the project.',
    })
  );
}
