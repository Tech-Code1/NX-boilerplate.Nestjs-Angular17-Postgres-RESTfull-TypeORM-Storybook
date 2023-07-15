import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ILogin } from '../interface/auth.interface';

export class LoginDTO implements ILogin {
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
