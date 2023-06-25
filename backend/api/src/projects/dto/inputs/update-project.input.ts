import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateProjectInput } from './create-project.input';

@InputType()
export class ProjectUpdateInput extends PartialType(CreateProjectInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;
}
