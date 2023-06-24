import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class BaseDTO {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id!: number;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
