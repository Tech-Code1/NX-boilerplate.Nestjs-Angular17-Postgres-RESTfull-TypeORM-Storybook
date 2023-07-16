import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'The email of the user.',
    maxLength: 100,
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  email!: string;

  @ApiProperty({
    description: 'The username of the user.',
    maxLength: 50,
    example: 'username',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username!: string;

  @ApiProperty({
    description: 'The password of the user.',
    maxLength: 100,
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password!: string;
}
