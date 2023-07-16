import { Project, User } from '@db/entities';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ACCES_LEVEL } from 'backend/database/src/constants/interfaces.entities';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UserToProjectDTO {
  @ApiPropertyOptional({
    description: 'UUID of the user',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    type: 'string',
  })
  @IsOptional()
  @IsUUID()
  user: User;

  @ApiPropertyOptional({
    description: 'UUID of the project',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    type: 'string',
  })
  @IsOptional()
  @IsUUID()
  project: Project;

  @ApiPropertyOptional({
    description: 'Access level of the user in the project',
    enum: ACCES_LEVEL,
  })
  @IsOptional()
  @IsEnum(ACCES_LEVEL)
  accesLevel: ACCES_LEVEL;
}
