import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { join } from 'path';

export const configGraphQl: ApolloDriverConfig = {
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
};
