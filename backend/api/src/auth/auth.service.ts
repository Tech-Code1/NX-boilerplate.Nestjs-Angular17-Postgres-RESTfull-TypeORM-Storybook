import { Token, User } from '@db/entities';
import { HASH_SALT, NODEMAILER_USER, PASS_GMAIL } from '@environments';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import dayjs from 'dayjs';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { Repository } from 'typeorm';
import { BLOCKED_TIME } from '../../../database/src/constants/interfaces.entities';
import { UsersService } from '../users/users.service';
import { ErrorManager } from '../utils/error.manager';
import { emailRecoverPassHTML } from '../utils/handlebars/recoverPassword';
import { emailRecoverPassSuccessHTML } from '../utils/handlebars/recoverPasswordSuccess';
import { generateResetLink } from '../utils/linkUtils';
import { AuthInput, LoginInput } from './dto/inputs';
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

  public async signup(authInput: AuthInput): Promise<AuthResponse> {
    const user = await this.userService.createUser(authInput);

    await this.userService.findUserByEmail(user.email);

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
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

  public async getTokenDB(user: User) {
    let token = await this.tokenRepository
      .createQueryBuilder()
      .where(`"userId" =:userId`, { userId: user.id })
      .getOne();

    if (token) {
      await this.tokenRepository.remove(token);
    }

    let resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, HASH_SALT); // 10 is a recommended salt round

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

    await this.sendEmail(
      {
        to: user.email,
        subject: 'Recover password',
        htmlBody: emailBody,
      },
      user
    );
  }

  async sendEmail(
    emailOptions: {
      subject: string;
      htmlBody: string;
      to: string;
    },
    user: User,
    smtpConfig?: any
  ): Promise<void> {
    const config = smtpConfig || {
      service: 'gmail',
      auth: {
        user: NODEMAILER_USER,
        pass: PASS_GMAIL,
      },
    };

    const { htmlBody, subject, to } = emailOptions;

    const mailOptions = {
      from: NODEMAILER_USER,
      to,
      subject,
      html: htmlBody,
    };

    const transporter = nodemailer.createTransport(config);
    await transporter.sendMail(mailOptions, (err) => {
      if (err) {
        throw ErrorManager.createError(
          'The email could not be sent, something unexpected happened',
          'BAD_REQUEST'
        );
      } else {
        console.log(`Email sent to: ${user.email}`);
      }
    });
  }

  resetPassword = async (userId, token, password) => {
    const passwordResetToken = await this.tokenRepository.findOneByOrFail({
      user: userId,
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

    await this.userService.updateUser({ id: userId, password: hash }, id);

    const user = await this.userService.findUserById(userId);
    const emailBody = emailRecoverPassSuccessHTML(user.username, password);

    if (!user || emailBody) {
      throw ErrorManager.createError('Something has gone wrong', 'BAD_REQUEST');
    }

    await this.sendEmail(
      {
        to: user.email,
        subject: 'Recover password',
        htmlBody: emailBody,
      },
      user
    );

    await this.tokenRepository.remove(token);

    return true;
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
