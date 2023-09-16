import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ChangePassDTO {
  @IsNotEmpty()
  @IsUUID('all')
  @ApiProperty({
    description: 'The unique identifier of the user.',
    type: String,
    format: 'uuid',
  })
  id!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The token that the user provides.',
    type: String,
  })
  token!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The new password that the user wants to set.',
    type: String,
  })
  password!: string;
}
