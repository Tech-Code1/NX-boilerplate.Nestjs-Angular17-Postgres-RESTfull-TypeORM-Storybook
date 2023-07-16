import { BLOCKED_TIME, ROLES } from '@db/constants';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty({
    description: 'UUID of the user to update',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    type: 'string',
  })
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;

  @ApiPropertyOptional({
    description: 'First name of the user',
    example: 'John',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name of the user',
    example: 'Doe',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Age of the user',
    example: 25,
    type: 'number',
  })
  @IsOptional()
  @IsInt()
  @Min(3)
  age?: number;

  @ApiPropertyOptional({
    description: 'Is the user active?',
    example: true,
    type: 'boolean',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Is the user blocked?',
    example: false,
    type: 'boolean',
  })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;

  @ApiPropertyOptional({
    description: 'How long is the user blocked?',
    example: BLOCKED_TIME.ONE_HOUR,
    enum: BLOCKED_TIME,
    type: 'number',
  })
  @IsOptional()
  @IsInt()
  timeBlocked?: BLOCKED_TIME;

  @ApiPropertyOptional({
    description: 'Role of the user',
    example: [ROLES.USER],
    enum: ROLES,
    isArray: true,
    type: 'array',
  })
  @IsOptional()
  @IsEnum(ROLES, { each: true })
  role?: ROLES[];
}
