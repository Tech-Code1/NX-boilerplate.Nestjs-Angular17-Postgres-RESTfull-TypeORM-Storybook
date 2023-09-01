import { configModule } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from '../../database/src/lib/database.module';
import { Modules } from './';
import { TransformInterceptor } from './interceptors';
@Module({
  imports: [ConfigModule.forRoot(configModule), ...Modules, DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
