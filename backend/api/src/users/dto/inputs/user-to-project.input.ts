import { Projects, Users } from '@db/entities';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ACCES_LEVEL } from 'backend/database/src/constants/interfaces.entities';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

registerEnumType(ACCES_LEVEL, {
  name: 'ACCES_LEVEL',
});
@InputType()
export class UserToProjectDTO {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => Users)
  user: Users;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => Projects)
  project: Projects;

  @IsNotEmpty()
  @IsEnum(ACCES_LEVEL)
  @Field(() => ACCES_LEVEL)
  accesLevel: ACCES_LEVEL;
}
