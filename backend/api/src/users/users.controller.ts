import { ROLES } from '@db/constants';
import { User, UsersProjects } from '@db/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Resp } from '../utils';
import {
  BlockUserDoc,
  DeleteUserDoc,
  RegisterUserDoc,
  UpdateUserDoc,
  UserDoc,
  UserInProjectDoc,
  UsersDoc,
  UsersProjectsDoc,
  UsersRolDoc,
} from './decorators';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserToProjectDTO,
  ValidRolesDTO,
} from './dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UsersDoc()
  public async findAllUsers(
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('args')
  @UsersRolDoc()
  public async findAllArgs(
    @Body() validRoles: ValidRolesDTO,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User[]> {
    return await this.usersService.findAllArgs(validRoles.roles);
  }

  @Get(':id/projects')
  @UsersProjectsDoc()
  public async findUserByIdWithProjects(
    @Param('id') id: string,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User> {
    return await this.usersService.findUserByIdWithProjects(id);
  }

  @Get(':id')
  @UserDoc()
  public async findUserById(
    @Param('id') id: string,
    @CurrentUser([ROLES.ADMIN]) user: User
  ) {
    try {
      const user = await this.usersService.findUserById(id);
      return Resp.Success<User>(user, 'OK');
    } catch (error) {
      throw Resp.Error('NOT_FOUND', 'User not found');
    }
  }

  @Public()
  @Post('register')
  @RegisterUserDoc()
  public async registerUser(@Body() registerUser: CreateUserDTO) {
    return await this.usersService.registerUser(registerUser);
  }

  @Post('project')
  @UserInProjectDoc()
  public async userInProject(
    @Body() body: UserToProjectDTO,
    @CurrentUser([ROLES.CREATOR]) user: User
  ): Promise<UserToProjectDTO & UsersProjects> {
    return await this.usersService.relationToProject(body);
  }

  @Put()
  @UpdateUserDoc()
  public async updateUser(
    @Body() updateUserInput: UpdateUserDTO,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User> {
    return await this.usersService.updateUser(updateUserInput, user);
  }

  @Delete(':id')
  @DeleteUserDoc()
  public async deleteUser(
    @Param('id') id: string,
    @CurrentUser([ROLES.USER]) user: User
  ): Promise<User> {
    return await this.usersService.deleteUser(id);
  }

  @Put('block/:id')
  @BlockUserDoc()
  public async blockUser(
    @Param('id') id: string,
    @Body('timeBlocked') timeBlocked: number,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User> {
    return await this.usersService.blockUser(id, timeBlocked, user);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @CurrentUser() { id }: User,
    @Body() { currentPassword, newPassword }: ChangePasswordDTO
  ): Promise<{ message: string }> {
    await this.usersService.changeKnownPassword(
      id,
      currentPassword,
      newPassword
    );
    return Resp.Success<object>({}, 'OK', 'Password changed successfully!');
  }
}
