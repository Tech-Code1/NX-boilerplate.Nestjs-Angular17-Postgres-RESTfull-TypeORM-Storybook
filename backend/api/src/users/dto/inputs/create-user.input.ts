import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
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
}
