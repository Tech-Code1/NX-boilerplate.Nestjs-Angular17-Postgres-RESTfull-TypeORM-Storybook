import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class RequestPasswordResetResult {
  @Field(() => String, {
    name: 'message',
    description: 'Message sent to the user to reset their password',
  })
  @IsString()
  message: string;
}
