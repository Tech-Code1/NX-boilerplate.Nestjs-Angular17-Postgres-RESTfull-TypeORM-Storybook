import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IAuth } from '../interface/auth.interface';

export class AuthDTO implements IAuth {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The username of the user.',
    type: String,
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user.',
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'The password of the user. Must be at least 6 characters.',
    type: String,
  })
  password: string;
}
