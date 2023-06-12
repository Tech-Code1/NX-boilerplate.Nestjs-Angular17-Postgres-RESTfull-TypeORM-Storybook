import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from '../users/service/users.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [ UsersModule ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
