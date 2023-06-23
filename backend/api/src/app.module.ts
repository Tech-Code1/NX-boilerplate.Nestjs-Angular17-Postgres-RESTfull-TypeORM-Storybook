import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import Joi from 'joi';
import { join } from 'path';
import { configs } from '../../../config/backend.config';
import { DatabaseModule } from '../../database/src/lib/database.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { validation } from './shared/utils/validationSchema';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

interface HttpResponse {
  statusCode: number;
  message: string[] | string;
  error: string;
}
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object<typeof validation>(validation),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      includeStacktraceInErrorResponses: false,
      formatError: (error: GraphQLError) => {
        const { extensions } = error;
        const { code, status, success } = extensions;
        const originalError = extensions.originalError;
        const customError = originalError as any;

        console.log(error);

        return {
          message: customError?.message || error.message || 'Unspecified error',
          status: customError?.statusCode || status || 0,
          code: code || 'UNKNOWN',
          success: success || false,
        };
      },
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
