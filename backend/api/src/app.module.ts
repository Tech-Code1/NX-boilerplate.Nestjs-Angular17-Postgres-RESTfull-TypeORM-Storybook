import { configGraphQl, configModule } from '@config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../../database/src/lib/database.module';
import { Modules } from './';
@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    GraphQLModule.forRoot<ApolloDriverConfig>(configGraphQl),
    ...Modules,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
