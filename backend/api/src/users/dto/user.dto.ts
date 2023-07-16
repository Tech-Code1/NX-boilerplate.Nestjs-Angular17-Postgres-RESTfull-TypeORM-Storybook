import { ROLES } from '@db/constants';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { BaseDTO } from './baseDto';

export class UserDTO extends BaseDTO {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName!: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName!: string;

  @ApiProperty({
    description: 'Age of the user',
    example: 25,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(3)
  age!: number;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  email!: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username!: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password1234',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password!: string;

  @ApiProperty({
    description: 'Is the user active?',
    example: true,
    type: 'boolean',
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;

  @ApiProperty({
    description: 'Role of the user',
    example: [ROLES.USER],
    enum: ROLES,
    isArray: true,
    type: 'array',
  })
  @IsNotEmpty()
  @IsEnum(ROLES, { each: true })
  role!: ROLES[];
}
