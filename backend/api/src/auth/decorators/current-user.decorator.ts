import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ErrorManager } from '../../utils/error.manager';

export const CurrentUser = createParamDecorator(
  (roles = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      throw ErrorManager.createError(
        'No user inside the request - make sure that we used the AuthGuard',
        'INTERNAL_SERVER_ERROR'
      );
    }

    return user;
  }
);
