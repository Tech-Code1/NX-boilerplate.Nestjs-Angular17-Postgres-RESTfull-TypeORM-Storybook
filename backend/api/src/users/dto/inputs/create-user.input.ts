import { ROLES } from '@db/constants';
import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
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

registerEnumType(ROLES, {
  name: 'ROLES',
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
  @IsNumber()
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

  @Field(() => ROLES, { description: 'Indicates if the user is active or not' })
  @IsNotEmpty()
  @IsEnum(ROLES)
  role!: ROLES;
}
