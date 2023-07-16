import { ROLES } from '@db/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class ValidRolesDTO {
  @ApiProperty({
    type: [String],
    description: 'An array of valid roles. Default is ["USER"].',
    example: [ROLES.USER],
    default: [ROLES.USER],
  })
  @IsArray()
  roles: ROLES[] = [ROLES.USER];
}
