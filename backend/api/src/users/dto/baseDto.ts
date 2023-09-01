import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class BaseDTO {
  @ApiProperty({
    description: 'A unique identifier for each entity.',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @ApiPropertyOptional({
    description: 'The timestamp when the entity was created.',
    type: Date,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiPropertyOptional({
    description: 'The timestamp when the entity was last updated.',
    type: Date,
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiPropertyOptional({
    description: 'The timestamp when the entity was deleted (soft delete).',
    type: Date,
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
