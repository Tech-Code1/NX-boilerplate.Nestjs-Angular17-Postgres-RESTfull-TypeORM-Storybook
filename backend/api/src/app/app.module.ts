import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NODE_ENV, TYPEORM_CONFIG } from '../../../../config/constants';
import { configs } from '../../../../config/backend.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../../../database/src';
import { validation } from '../shared/utils/validationSchema';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({...configService.get(TYPEORM_CONFIG)}),
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configs],
			envFilePath: `.env.${NODE_ENV || 'development'}`,
			validationSchema: Joi.object<typeof validation>(validation)
		}),
		DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
