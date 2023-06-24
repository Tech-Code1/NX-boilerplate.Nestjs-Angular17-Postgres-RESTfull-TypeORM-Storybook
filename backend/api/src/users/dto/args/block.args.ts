import { BLOCKED_TIME } from '@db/constants';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class BlockArgs {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;

  @Field(() => BLOCKED_TIME, {
    description: 'Lock time',
  })
  @IsNotEmpty()
  @IsInt()
  timeBlocked!: BLOCKED_TIME;
}
