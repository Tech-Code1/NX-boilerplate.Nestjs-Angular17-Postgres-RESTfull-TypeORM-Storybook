import { Projects, Users } from '@db/entities';
import {
  ACCES_LEVEL,
  ROLES,
} from 'backend/database/src/constants/interfaces.entities';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsNumber()
  age!: number;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role!: ROLES;
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  lastName!: string;

  @IsOptional()
  @IsNumber()
  age!: number;

  @IsOptional()
  @IsString()
  email!: string;

  @IsOptional()
  @IsString()
  username!: string;

  @IsOptional()
  @IsString()
  password!: string;

  @IsOptional()
  @IsBoolean()
  isActive!: boolean;

  @IsOptional()
  @IsEnum(ROLES)
  role!: ROLES[];
}

export class UserToProjectDTO {
  @IsNotEmpty()
  @IsUUID()
  user: Users;

  @IsNotEmpty()
  @IsUUID()
  project: Projects;

  @IsNotEmpty()
  @IsEnum(ACCES_LEVEL)
  accesLevel: ACCES_LEVEL;
}
