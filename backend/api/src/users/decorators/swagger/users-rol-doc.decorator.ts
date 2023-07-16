import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidRolesDTO } from '../../dto';

export function UsersRolDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all users with specified roles' }),
    ApiBody({ type: ValidRolesDTO }),
    ApiResponse({
      status: 200,
      description: 'Return all users with specified roles.',
    })
  );
}
