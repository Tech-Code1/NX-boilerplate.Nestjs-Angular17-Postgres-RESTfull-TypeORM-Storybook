import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDeleteDTO {
  @Field(() => Int)
  affected!: number;
}
