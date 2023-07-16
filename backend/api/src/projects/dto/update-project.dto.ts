import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateProjectDTO } from './create-project.dto';

export class ProjectUpdateDTO extends PartialType(CreateProjectDTO) {
  @ApiProperty({
    description: 'The unique identifier of the project',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;
}
