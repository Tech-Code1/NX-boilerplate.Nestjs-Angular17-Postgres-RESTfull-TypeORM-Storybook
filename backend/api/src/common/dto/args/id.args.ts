import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class IdArgs {
  @IsNotEmpty()
  @IsUUID('all')
  @Field(() => ID)
  id!: string;
}
