import { User } from '@db/entities';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { AuthInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async signup(authInput: AuthInput): Promise<AuthResponse> {
    const user = await this.userService.createUser(authInput);

    const token = 'ABC123';

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

    const token = 'ABC123';

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
}
