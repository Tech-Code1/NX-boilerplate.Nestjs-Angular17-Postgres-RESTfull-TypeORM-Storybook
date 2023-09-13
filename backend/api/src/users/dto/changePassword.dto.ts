import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty({ message: 'Current password should not be empty.' })
  @IsString({ message: 'Current password should be a string.' })
  @MinLength(6, {
    message:
      'Current password is too short. It should be at least 8 characters.',
  })
  @MaxLength(128, {
    message:
      'Current password is too long. It should be at most 128 characters.',
  })
  @ApiProperty({
    description: 'Current password of the user.',
    minLength: 6,
    maxLength: 128,
    type: String,
  })
  currentPassword: string;

  @IsNotEmpty({ message: 'New password should not be empty.' })
  @IsString({ message: 'New password should be a string.' })
  @MinLength(6, {
    message: 'New password is too short. It should be at least 8 characters.',
  })
  @MaxLength(128, {
    message: 'New password is too long. It should be at most 128 characters.',
  })
  @ApiProperty({
    description: 'New password to be set for the user.',
    minLength: 6,
    maxLength: 128,
    type: String,
  })
  newPassword: string;
}
