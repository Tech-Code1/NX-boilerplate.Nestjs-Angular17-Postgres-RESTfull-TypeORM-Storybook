import { Token, User } from '@db/entities';
import { HASH_SALT } from '@environments';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import dayjs from 'dayjs';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { BLOCKED_TIME } from '../../../database/src/constants/interfaces.entities';
import { UsersService } from '../users/users.service';
import { sendEmail } from '../utils';
import { ErrorManager } from '../utils/error.manager';
import { emailRecoverPassHTML } from '../utils/handlebars/recoverPassword';
import { emailRecoverPassSuccessHTML } from '../utils/handlebars/recoverPasswordSuccess';
import { generateResetLink } from '../utils/linkUtils';
import { AuthDTO, LoginDTO } from './dto';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {
  private getJwtToken(id: string) {
    return this.jwtService.sign({ id });
  }

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async signup(auth: AuthDTO): Promise<AuthResponse> {
    const { email } = auth;

    const user = await this.userService.findUserByEmail(email);

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }

  public async login({ email, password }: LoginDTO): Promise<AuthResponse> {
    const user = await this.userService.findUserByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw ErrorManager.createError(
        'Your password or email are incorrect',
        'BAD_REQUEST'
      );
    }

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }

  public async getTokenDB(user: User) {
    let token = await this.tokenRepository
      .createQueryBuilder()
      .where(`"userId" =:userId`, { userId: user.id })
      .getOne();

    if (token) {
      await this.tokenRepository.remove(token);
    }

    let resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, HASH_SALT);

    token = this.tokenRepository.create({
      user,
      token: hash,
      createdAt: new Date(),
    });

    await this.tokenRepository.save(token);

    return resetToken;
  }

  async requestPasswordReset(email: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw ErrorManager.createError('', 'NOT_FOUND');
    }

    const resetToken = await this.getTokenDB(user);

    const link = generateResetLink(resetToken, user.id);
    const emailBody = emailRecoverPassHTML(user.username, link);

    if (!link || !emailBody) {
      throw ErrorManager.createError('Something has gone wrong', 'BAD_REQUEST');
    }

    await sendEmail(
      {
        to: user.email,
        subject: 'Recover password',
        htmlBody: emailBody,
      },
      user
    );
  }

  changePassword = async (userId, token, password) => {
    const passwordResetToken = await this.tokenRepository.findOneByOrFail({
      user: { id: userId },
    });

    if (!passwordResetToken) {
      throw ErrorManager.createError(
        'Invalid or expired password reset token',
        'UNAUTHORIZED'
      );
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
      throw ErrorManager.createError(
        'Invalid or expired password reset token',
        'UNAUTHORIZED'
      );
    }

    const hash = await bcrypt.hash(password, HASH_SALT);

    await this.userService.updateUser({ id: userId, password: hash }, userId);

    await this.tokenRepository.remove(passwordResetToken);

    const user = await this.userService.findUserById(userId);
    const emailBody = emailRecoverPassSuccessHTML(user.username, password);

    if (!user || !emailBody) {
      throw ErrorManager.createError('Something has gone wrong', 'BAD_REQUEST');
    }

    await sendEmail(
      {
        to: user.email,
        subject: 'Your password has been successfully changed',
        htmlBody: emailBody,
      },
      user
    );
  };

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

  revalidateToken(user: User) {
    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }
}
