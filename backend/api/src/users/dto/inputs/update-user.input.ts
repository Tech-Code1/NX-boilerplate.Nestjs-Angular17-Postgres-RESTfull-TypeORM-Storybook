import { ROLES } from '@db/constants';
import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

registerEnumType(ROLES, {
  name: 'ROLES',
});

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field(() => String, { description: 'Firt name of user', nullable: true })
  firstName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field(() => String, { description: 'Last name of user', nullable: true })
  lastName!: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(3)
  @Field(() => Int, { description: 'Age of user', nullable: true })
  age!: number;

  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  @Field(() => String, { description: 'Email of user', nullable: true })
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field(() => String, { description: 'Username of user', nullable: true })
  username!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Field(() => String, { description: 'Password of user', nullable: true })
  password!: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, {
    description: 'Indicates if the user is active or not',
    nullable: true,
  })
  isActive!: boolean;

  @IsOptional()
  @IsEnum(ROLES)
  @Field(() => ROLES, {
    description: 'Indicates if the user is active or not',
    nullable: true,
  })
  role!: ROLES;
}
