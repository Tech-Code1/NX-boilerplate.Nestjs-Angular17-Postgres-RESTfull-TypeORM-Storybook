import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field(() => String, { description: 'Name of the project' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { description: 'Description of the project' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
