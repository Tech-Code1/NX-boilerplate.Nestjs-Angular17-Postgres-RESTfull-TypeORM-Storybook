import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/service/users.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../../constants/key-decorators';
import { IUseToken } from '../interface/auth.interface';
import { useToken } from '../../utils/use.token';
// import { Request, Response } from 'express';

// declare module 'express-serve-static-core' {
//   interface Request {
//     idUser: string;
//     rolUser: string[];
//   }
// }

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( 
    private readonly userService: UsersService,
    private readonly reflector: Reflector,

  ) {

  }

  async canActivate(
    context: ExecutionContext
  ) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )

    if(isPublic) {
      return true
    }

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['auth_token'];

    if(!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token')
    }

    const manageToken: IUseToken | string = useToken(token);

    if(typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken)
    }

    if(manageToken.isExpired) {
      throw new UnauthorizedException('Token is expired')
    }

    const { sub } = manageToken;
    const user = await this.userService.findUserById(sub);

    if(!user) {
      throw new UnauthorizedException('Invalid User')
    }

    req.idUser = user.id;
    req.rolUser = user.role;
    return true;
  }
}
