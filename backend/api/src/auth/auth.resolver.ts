import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'Auth_User' })
  async signin(@Args('authInput') authInput: AuthInput): Promise<AuthResponse> {
    return this.authService.signup(authInput);
  }

  /* @Mutation( , {name: 'login'})
  async login(): Promise<void> {
    return this.authService.login()
  } */

  /* @Query( , {name: 'revalidate'})
  async revalidateToken() {
    return this.authService.revalidateToken();
  } */
}
