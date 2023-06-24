import { BLOCKED_TIME, ROLES } from '@db/constants';
import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
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
import { CreateUserInput } from '../inputs/create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;

  @Field(() => String, { description: 'Firt name of user', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @Field(() => String, { description: 'Last name of user', nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @Field(() => Int, { description: 'Age of user', nullable: true })
  @IsOptional()
  @IsInt()
  @Min(3)
  age?: number;

  @Field(() => Boolean, {
    description: 'Indicates if the user is active or not',
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field(() => Boolean, {
    description: 'Ban user for breaking rules',
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;

  @Field(() => BLOCKED_TIME, {
    description: 'Lock time',
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  timeBlocked?: BLOCKED_TIME;

  @Field(() => [ROLES], {
    description: 'Indicates if the user is active or not',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(ROLES)
  role?: ROLES[];
}
