import { configModule } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database/src/lib/database.module';
import { Modules } from './';
@Module({
  imports: [ConfigModule.forRoot(configModule), ...Modules, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
