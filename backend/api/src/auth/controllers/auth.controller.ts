import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { IAuthBody } from '../interface/auth.interface';
import { AuthService } from '../services/auth.service';
import { IAuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() {username, password}: IAuthDTO) {
        const userValidate = await this.authService.validateUser(
            username, 
            password
        );
        
        if(!userValidate) {
            throw new UnauthorizedException('Data not valid');
        }

        const jwt = await this.authService.generateJWT(userValidate);

        return jwt;
    }
}
