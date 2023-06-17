import { ROLES } from '@db/constants';
import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

registerEnumType(ROLES, {
  name: 'ROLES',
});

@ArgsType()
export class IdArgs {
  @IsNotEmpty()
  @IsString()
  @Field(() => Int)
  id!: number;
}
