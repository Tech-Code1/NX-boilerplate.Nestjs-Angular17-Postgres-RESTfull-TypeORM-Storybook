import { Projects, User } from '@db/entities';
import { ArgsType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ACCES_LEVEL } from 'backend/database/src/constants/interfaces.entities';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

registerEnumType(ACCES_LEVEL, {
  name: 'ACCES_LEVEL',
});

@ArgsType()
export class UserToProjectArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  user: User;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  project: Projects;

  @IsOptional()
  @IsEnum(ACCES_LEVEL)
  @Field(() => ACCES_LEVEL, { nullable: true })
  accesLevel: ACCES_LEVEL;
}
