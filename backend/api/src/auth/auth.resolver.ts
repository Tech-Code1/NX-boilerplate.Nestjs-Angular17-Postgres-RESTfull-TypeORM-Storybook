import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ErrorManager } from '../utils/error.manager';
import { AuthService } from './auth.service';
import { AuthInput, LoginInput } from './dto/inputs';
import { JwtAuthGuard } from './guards';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
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
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(): //@Args()
  AuthResponse {
    //return this.authService.revalidateToken();

    throw ErrorManager.createError('Not implemented');
  }
}
