import { ROLES } from '@db/constants';
import { User } from '@db/entities';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators';
import { AuthDTO, ChangePassDTO, LoginDTO } from './dto';
import { JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() authInput: AuthDTO) {
    return this.authService.signup(authInput);
  }

  @Post('login')
  async login(@Body() loginInput: LoginDTO) {
    return this.authService.login(loginInput);
  }

  @Get('revalidate')
  @UseGuards(JwtAuthGuard)
  async revalidateToken(@CurrentUser([ROLES.ADMIN]) user: User) {
    return this.authService.revalidateToken(user);
  }

  @Post('reset-password')
  async requestPasswordReset(@Body('email') email: string) {
    await this.authService.requestPasswordReset(email);
    return {
      message:
        'If an account with that email exists, we sent you an email to reset your password',
    };
  }

  @Post('change-password')
  async requestPasswordChange(@Body() changePass: ChangePassDTO) {
    const { userId, token, password } = changePass;
    await this.authService.changePassword(userId, token, password);
    return {
      message: 'Your password has been successfully changed',
    };
  }
}
