import { ROLES } from '@db/constants';
import {
  Field,
  ID,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';

registerEnumType(ROLES, {
  name: 'ROLES',
});

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;
}
