import { ROLES } from '@db/constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Resp } from '../../utils/response.manager';

export const CurrentUser = createParamDecorator(
  (roles: ROLES[], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw Resp.Error(
        'No user inside the request - make sure that we used the AuthGuard',
        'INTERNAL_SERVER_ERROR'
      );
    }

    if (!roles) return user;

    if (user.roles.some((role) => roles.includes(role))) return user;

    throw Resp.Error(`User ${user.username} is not a valid role`, 'FORBIDDEN');
  }
);
