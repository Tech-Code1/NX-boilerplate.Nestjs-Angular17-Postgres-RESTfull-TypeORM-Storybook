import { ROLES } from '@db/constants';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  ACCES_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from '../../constants/key-decorators';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler()
    );

    const accesLevel = this.reflector.get<number>(
      ACCES_LEVEL_KEY,
      context.getHandler()
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();
    const { roleUser, idUser } = req;

    if (!roleUser || !idUser || !req.params.projectId) {
      throw new UnauthorizedException('Missing required information');
    }

    if (accesLevel === undefined) {
      if (roles === undefined) {
        if (!admin) {
          return true;
        } else if (admin && roleUser === admin) {
          return true;
        } else {
          throw new UnauthorizedException(
            'You do not have permission for this operation'
          );
        }
      }
    }

    if (roleUser === ROLES.ADMIN || roleUser === ROLES.CREATOR) {
      return true;
    }

    const user = await this.userService.findUserById(idUser);
    const userExistInProject = user.projectsIncludes.find(
      (project) => project.project.id === req.params.projectId
    );

    if (userExistInProject === undefined) {
      throw new UnauthorizedException('You are not part of the project');
    }

    if (accesLevel > userExistInProject.accesLevel) {
      throw new UnauthorizedException('You do not have the access level');
    }

    return true;
  }
}
