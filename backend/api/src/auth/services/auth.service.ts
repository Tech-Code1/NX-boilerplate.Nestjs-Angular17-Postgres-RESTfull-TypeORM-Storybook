import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../../users/service/users.service';
import { Users } from '@db/entities';
import { IPayloadToken } from '../interface/auth.interface';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService){}

    public async validateUser(username: string, password: string) {
        const userByUsername = await this.userService.findBy({
            key: 'username',
            value: username
        });
        const userByEmail = await this.userService.findBy({
            key: 'email',
            value: username
        });

        if(userByUsername) {
            const match = await bcrypt.compare(password, userByUsername.password);
            if(match) return userByUsername;
        }

        if(userByEmail) {
            const match = await bcrypt.compare(password, userByEmail.password);
            if(match) return userByEmail;
        }

        return null;
    }

    public signJWT(
        {
            payload, 
            secret, 
            expires
        }:{
            payload: jwt.JwtPayload; 
            secret: string; 
            expires: number | string
        }) {

            return jwt.sign(payload, secret, { expiresIn: expires })
    }

    public async generateJWT( user: Users ): Promise<any> {
        const getUser = await this.userService.findUserById(user.id);

        const payload: IPayloadToken = {
            id: getUser.id,
            role: getUser.role
        }

        return {
            accesToken: this.signJWT({
                payload,
                secret: process.env.JWT_SECRET,
                expires: '1h'
            }),
            user,
        }
    }
}
