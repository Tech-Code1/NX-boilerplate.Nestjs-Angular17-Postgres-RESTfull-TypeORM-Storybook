import { User } from '@db/entities';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
