import { Projects, Users } from '@db/entities';
import { ArgsType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ACCES_LEVEL } from 'backend/database/src/constants/interfaces.entities';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

registerEnumType(ACCES_LEVEL, {
  name: 'ACCES_LEVEL',
});

@ArgsType()
export class UserToProjectArgs {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  user: Users;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  project: Projects;

  @IsNotEmpty()
  @IsEnum(ACCES_LEVEL)
  @Field(() => ACCES_LEVEL)
  accesLevel: ACCES_LEVEL;
}
