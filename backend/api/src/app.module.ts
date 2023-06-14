import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { configs } from '../../../config/backend.config';
import { TYPEORM_CONFIG } from '../../../config/constants';
import { DatabaseModule } from '../../database/src/lib/database.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { validation } from './shared/utils/validationSchema';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

console.log();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get(TYPEORM_CONFIG),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object<typeof validation>(validation),
    }),
    UsersModule,
    ProjectsModule,
    AuthModule,
    TasksModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
