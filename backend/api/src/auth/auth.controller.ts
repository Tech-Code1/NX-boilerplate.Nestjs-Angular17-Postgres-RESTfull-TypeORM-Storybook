import { User } from '@db/entities';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Resp } from '../utils';
import { AuthService } from './auth.service';
import {
  ChangePassDoc,
  CurrentUser,
  LoginDoc,
  Public,
  ResetPassDoc,
  RevalidateDoc,
  SignupDoc,
} from './decorators';
import { AuthDTO, ChangePassDTO, LoginDTO } from './dto';
import { JwtAuthGuard } from './guards';
import { AuthGuard } from './guards/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SignupDoc()
  async register(@Body() authInput: AuthDTO) {
    return this.authService.signup(authInput);
  }

  @Post('login')
  @LoginDoc()
  async login(@Body() loginInput: LoginDTO) {
    return this.authService.login(loginInput);
  }

  @Get('revalidate')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @RevalidateDoc()
  async revalidateToken(@CurrentUser() user: User) {
    const result = this.authService.revalidateToken(user);
    return result;
  }

  @Post('recover')
  @ResetPassDoc()
  async requestPasswordReset(@Body('email') email: string) {
    await this.authService.requestPasswordReset(email);
    return Resp.Success<object>(
      {},
      'OK',
      'If an account with that email exists, we sent you an email to reset your password'
    );
  }

  @Post('change-password')
  @Public()
  @ChangePassDoc()
  async requestPasswordChange(@Body() changePass: ChangePassDTO) {
    const { id, token, password } = changePass;
    await this.authService.changePassword(id, token, password);

    return Resp.Success<object>(
      {},
      'ACCEPTED',
      'Your password has been successfully changed'
    );
  }
}
