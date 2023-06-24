import { ROLES } from '@db/constants';
import { User, UsersProjects } from '@db/entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards';
import { BlockArgs, IdArgs, UserToProjectArgs } from './dto/args';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { UpdateUserInput, UserToProjectInput } from './dto/inputs';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], {
    description: 'Find All Users',
    name: 'All_Users',
  })
  public async findAllUsers(
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => [User], {
    description: 'Find All Args',
    name: 'All_Args',
  })
  public async findAllArgs(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User[]> {
    console.log(user);

    return await this.usersService.findAllArgs(validRoles.roles);
  }

  @Query(() => User, {
    description: 'Find User with projects',
    name: 'One_User_Projects',
  })
  public async findUserByIdWithProjects(
    @Args() { id }: IdArgs,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User> {
    return await this.usersService.findUserByIdWithProjects(id);
  }

  @Query(() => User, {
    description: 'Find specific user by his ID',
    name: 'One_User',
  })
  public async findUserById(
    @Args() { id }: IdArgs,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User> {
    return await this.usersService.findUserById(id);
  }

  @Mutation(() => User, {
    description: 'Add user to project',
    name: 'Add_To_Project',
  })
  public async userInProject(
    @Args() body: UserToProjectArgs,
    @CurrentUser([ROLES.CREATOR]) user: User
  ): Promise<UserToProjectInput & UsersProjects> {
    return await this.usersService.relationToProject(body);
  }

  @Mutation(() => User, {
    description: 'Edit user',
    name: 'Edit_User',
  })
  public async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User> {
    return await this.usersService.updateUser(
      updateUserInput.id,
      updateUserInput,
      user
    );
  }

  @Mutation(() => User, {
    description: 'Delete user',
    name: 'Delete_User',
  })
  public async deleteUser(
    @Args() { id }: IdArgs,
    @CurrentUser([ROLES.USER]) user: User
  ): Promise<User> {
    return await this.usersService.deleteUser(id);
  }

  @Mutation(() => User, {
    description: 'Block user',
    name: 'Block_User',
  })
  public async blockUser(
    @Args() { id, timeBlocked }: BlockArgs,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<User> {
    return await this.usersService.blockUser(id, timeBlocked, user);
  }
}
