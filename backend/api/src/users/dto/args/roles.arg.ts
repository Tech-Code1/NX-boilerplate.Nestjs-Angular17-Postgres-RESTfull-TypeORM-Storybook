import { ROLES } from '@db/constants';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class ValidRolesArgs {
  @Field(() => [ROLES])
  @IsArray()
  roles: ROLES[] = [ROLES.USER];
}
