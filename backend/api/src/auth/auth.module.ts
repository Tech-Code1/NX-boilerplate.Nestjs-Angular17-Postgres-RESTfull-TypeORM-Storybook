import { Global, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService, AuthResolver],
  controllers: [],
})
export class AuthModule {}
