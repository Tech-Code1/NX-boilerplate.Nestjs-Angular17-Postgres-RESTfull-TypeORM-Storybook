import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class IdArgs {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;
}
