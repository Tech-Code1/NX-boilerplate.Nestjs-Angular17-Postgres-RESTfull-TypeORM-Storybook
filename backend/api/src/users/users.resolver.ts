import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'Hola mundo';
  }
}
