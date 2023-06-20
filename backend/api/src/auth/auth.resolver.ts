import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput, LoginInput } from './dto/inputs';
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

  /* @Query( , {name: 'revalidate'})
  async revalidateToken() {
    return this.authService.revalidateToken();
  } */
}
