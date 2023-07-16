import { STATUS_TASK } from '@db/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'The unique identifier of the entity',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;

  @ApiProperty({ description: 'The name of the task' })
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @ApiProperty({ description: 'A detailed description of the task' })
  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @ApiProperty({
    description: 'The current status of the task',
    enum: STATUS_TASK,
  })
  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @ApiProperty({
    description: 'The name of the person responsible for the task',
  })
  @IsNotEmpty()
  @IsString()
  responsableName: string;
}
