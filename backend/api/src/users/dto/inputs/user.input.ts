import { ROLES } from '@db/constants';
import { Field, InputType, Int } from '@nestjs/graphql';
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
import { BaseDTO } from '../baseDTO';

@InputType()
export class UserInput extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Field(() => String, { description: 'Firt name of user' })
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Field(() => String, { description: 'Last name of user' })
  lastName!: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int, { description: 'Age of user' })
  @IsInt()
  @Min(3)
  age!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Field(() => String, { description: 'Email of user' })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Field(() => String, { description: 'Username of user' })
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Field(() => String, { description: 'Password of user' })
  password!: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean, {
    description: 'Indicates if the user is active or not',
  })
  isActive!: boolean;

  @IsNotEmpty()
  @IsEnum(ROLES)
  @Field(() => [ROLES], {
    description: 'Indicates if the user is active or not',
  })
  role!: ROLES[];
}
