import { ROLES } from '@db/constants';
import { User } from '@db/entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators';
import { ChangePassArgs } from './dto/args';
import { AuthInput, LoginInput } from './dto/inputs';
import { RequestPasswordResetResult } from './dto/requestPassword.dto';
import { RequestPasswordChangeResult } from './dto/requestPasswordChange.dto';
import { JwtAuthGuard } from './guards';
import { AuthResponse } from './types/auth-response.type';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'Auth_User' })
  async signin(@Args('authInput') authInput: AuthInput): Promise<AuthResponse> {
    return this.authService.signup(authInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse> {
    console.log(loginInput, 'login');

    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(@CurrentUser([ROLES.ADMIN]) user: User): AuthResponse {
    return this.authService.revalidateToken(user);
  }

  @Mutation(() => RequestPasswordResetResult, { name: 'Password_Reset' })
  async requestPasswordReset(@Args('email') email: string) {
    await this.authService.requestPasswordReset(email);
    return {
      message:
        'If an account with that email exists, we sent you an email to reset your password',
    };
  }

  @Mutation(() => RequestPasswordChangeResult, { name: 'Password_Change' })
  async requestPasswordChange(
    @Args() { userId, token, password }: ChangePassArgs
  ) {
    await this.authService.changePassword(userId, token, password);
    return {
      message: 'Your password has been successfully changed',
    };
  }
}
