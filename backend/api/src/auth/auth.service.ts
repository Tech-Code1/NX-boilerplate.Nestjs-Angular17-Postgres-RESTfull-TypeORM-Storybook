import { User } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import * as jwt from 'jsonwebtoken';
import { BLOCKED_TIME } from '../../../database/src/constants/interfaces.entities';
import { UsersService } from '../users/users.service';
import { ErrorManager } from '../utils/error.manager';
import { AuthInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {
  private getJwtToken(id: string) {
    return this.jwtService.sign({ id });
  }

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async signup(authInput: AuthInput): Promise<AuthResponse> {
    const user = await this.userService.createUser(authInput);

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };

    /* if (authInput) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }

    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }

    return null; */
  }

  public async login({ email, password }: LoginInput): Promise<AuthResponse> {
    const user = await this.userService.findUserByEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw ErrorManager.createError({
        type: 'NOT_FOUND',
      });
    }

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: User): Promise<any> {
    // const getUser = await this.userService.findUserById(user.id);

    /* const payload: IPayloadToken = {
      id: getUser.id,
      role: getUser.role,
    }; */

    return {
      /* accesToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }), */
      user,
    };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findUserById(id);

    if (!user.isActive) {
      throw ErrorManager.createError(
        'The user is inactive, talk to support to try to find a solution',
        'UNAUTHORIZED'
      );
    }

    if (user.isBlocked) {
      if (user.timeBlocked === BLOCKED_TIME.PERMANENT) {
        throw ErrorManager.createError(
          'You cannot access you are permanently banned',
          'UNAUTHORIZED'
        );
      }

      console.log(user.timeBlocked);

      const now = dayjs().valueOf();
      throw ErrorManager.createError(
        `You cannot access you are banned until ${dayjs(
          now + user.timeBlocked
        ).format('YYYY-MM-DD HH:mm')}`,
        'UNAUTHORIZED'
      );
    }

    delete user.password;

    return user;
  }
}
