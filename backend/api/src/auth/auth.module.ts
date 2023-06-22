import { JWT_SECRET } from '@environments';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        secret: JWT_SECRET,
        signOptions: {
          expiresIn: '4h',
        },
      }),
    }),
    UsersModule,
  ],
  providers: [AuthService, UsersService, AuthResolver, JwtStrategy],
  controllers: [],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
