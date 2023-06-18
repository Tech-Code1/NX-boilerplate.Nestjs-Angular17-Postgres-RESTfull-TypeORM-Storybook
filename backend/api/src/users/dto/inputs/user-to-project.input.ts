import { Projects, User } from '@db/entities';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ACCES_LEVEL } from 'backend/database/src/constants/interfaces.entities';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

registerEnumType(ACCES_LEVEL, {
  name: 'ACCES_LEVEL',
});
@InputType()
export class UserToProjectInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => User)
  user: User;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => Projects)
  project: Projects;

  @IsNotEmpty()
  @IsEnum(ACCES_LEVEL)
  @Field(() => ACCES_LEVEL)
  accesLevel: ACCES_LEVEL;
}
