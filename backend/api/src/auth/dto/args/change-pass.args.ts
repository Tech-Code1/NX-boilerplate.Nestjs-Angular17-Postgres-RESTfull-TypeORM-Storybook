import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class ChangePassArgs {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID('all')
  userId!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  token!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password!: string;
}
