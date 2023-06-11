import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../service/users.service'
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { Users } from '@db/entities';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    public async registerUser(body: UserDTO): Promise<Users> {
        return await this.usersService.createUser(body);
    }

    @Get('all')
    public async findAllUsers(): Promise<Users[]> {
        return await this.usersService.findUsers();
    }

    @Get(':id')
    public async findUserById(@Param('id') id: string): Promise<Users> {
        return await this.usersService.findUserById(id);
    }

    @Put('edit/:id')
    public async updateUser(@Param('id') id: string, @Body() body: UserUpdateDTO): Promise<UpdateResult | undefined> {
        return await this.usersService.updateUser(body, id);
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id') id: string): Promise<DeleteResult | undefined> {
        return await this.usersService.deleteUser(id);
    }
}
