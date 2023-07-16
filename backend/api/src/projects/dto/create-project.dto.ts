import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty({
    description: 'The name of the project',
    example: 'My Awesome Project',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the project',
    example: 'This is a project about...',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
