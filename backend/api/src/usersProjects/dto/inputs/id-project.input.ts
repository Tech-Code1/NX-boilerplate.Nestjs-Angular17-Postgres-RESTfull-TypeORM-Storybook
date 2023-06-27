import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class IdProject {
  @IsNotEmpty()
  @IsUUID('all')
  @Field(() => ID)
  id!: string;
}
