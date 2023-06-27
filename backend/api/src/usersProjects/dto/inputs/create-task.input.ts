import { STATUS_TASK } from '@db/constants';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field(() => String, { description: 'Name of the task' })
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @Field(() => String, { description: 'Description of the task' })
  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @Field(() => STATUS_TASK, { description: 'Current statuses of the task' })
  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @Field(() => String, { description: 'Name of the responsible person' })
  @IsNotEmpty()
  @IsString()
  responsableName: string;
}
