import { ROLES } from '@db/constants';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ErrorManager } from '../../utils/error.manager';

export const CurrentUser = createParamDecorator(
  (roles: ROLES[], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      throw ErrorManager.createError(
        'No user inside the request - make sure that we used the AuthGuard',
        'INTERNAL_SERVER_ERROR'
      );
    }

    if (!roles) return user;

    for (const role of roles) {
      if (roles.includes(role)) return user;
    }

    throw ErrorManager.createError(
      `User ${user.username} is not a valid role`,
      'FORBIDDEN'
    );
  }
);
