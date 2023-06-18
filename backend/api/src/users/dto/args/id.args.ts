import { ROLES } from '@db/constants';
import { ArgsType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

registerEnumType(ROLES, {
  name: 'ROLES',
});

@ArgsType()
export class IdArgs {
  @IsNotEmpty()
  @IsString()
  @Field(() => ID)
  id!: string;
}
