import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class RequestPasswordChangeResult {
  @Field(() => String, {
    name: 'message',
    description:
      'Message sent to the user after successfully changing their password.',
  })
  @IsString()
  message: string;
}
