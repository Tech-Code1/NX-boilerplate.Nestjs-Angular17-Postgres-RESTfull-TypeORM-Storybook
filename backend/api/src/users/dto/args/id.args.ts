import { ROLES } from '@db/constants';
import { ArgsType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

registerEnumType(ROLES, {
  name: 'ROLES',
});

@ArgsType()
export class IdArgs {
  @IsNotEmpty()
  @IsUUID('all')
  @Field(() => ID)
  id!: string;
}
