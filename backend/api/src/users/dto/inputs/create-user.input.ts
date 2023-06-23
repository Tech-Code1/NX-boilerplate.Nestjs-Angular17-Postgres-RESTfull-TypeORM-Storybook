import { BLOCKED_TIME, ROLES } from '@db/constants';
import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

registerEnumType(ROLES, {
  name: 'ROLES',
});

registerEnumType(BLOCKED_TIME, {
  name: 'BLOCKED_TIME',
});

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Firt name of user' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName!: string;

  @Field(() => String, { description: 'Last name of user' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName!: string;

  @Field(() => Int, { description: 'Age of user' })
  @IsNotEmpty()
  @IsInt()
  @Min(3)
  age!: number;

  @Field(() => String, { description: 'Email of user' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  email!: string;

  @Field(() => String, { description: 'Username of user' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username!: string;

  @Field(() => String, { description: 'Password of user' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password!: string;

  @Field(() => Boolean, {
    description: 'Indicates if the user is active or not',
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;

  @Field(() => Boolean, {
    description: 'Ban user for breaking rules',
  })
  @IsNotEmpty()
  @IsBoolean()
  isBlocked!: boolean;

  @Field(() => BLOCKED_TIME, {
    description: 'Lock time',
  })
  @IsNotEmpty()
  @IsInt()
  timeBlocked!: BLOCKED_TIME;

  @Field(() => ROLES, { description: 'Indicates if the user is active or not' })
  @IsOptional()
  @IsEnum(ROLES)
  role!: ROLES[];
}
