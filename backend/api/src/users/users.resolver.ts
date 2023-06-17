import { Users, UsersProjects } from '@db/entities';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateResult } from 'typeorm';
import {
  IdArgs,
  UserArgs,
  UserToProjectArgs,
  UserUpdateArgs,
} from './dto/args';
import { UserDeleteDTO, UserToProjectDTO } from './dto/inputs';
import { UsersService } from './users.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Users, {
    description: 'Register user',
    name: 'register',
  })
  public async registerUser(@Args() body: UserArgs): Promise<Users> {
    return await this.usersService.createUser(body);
  }

  @Query(() => [Users], {
    description: 'Find All Users',
    name: 'All_Users',
  })
  public async findAllUsers(): Promise<Users[]> {
    return await this.usersService.findUsers();
  }

  @Query(() => Users, {
    description: 'Find User',
    name: 'One_User',
  })
  public async findUserById(@Args() id: IdArgs): Promise<Users> {
    return await this.usersService.findUserById(id);
  }

  @Mutation(() => Users, {
    description: 'Add user to project',
    name: 'Add_To_Project',
  })
  public async userInProject(
    @Args() body: UserToProjectArgs
  ): Promise<UserToProjectDTO & UsersProjects> {
    return await this.usersService.relationToProject(body);
  }

  @Mutation(() => Users, {
    description: 'Edit user',
    name: 'Edit_User',
  })
  public async updateUser(
    @Args() body: UserUpdateArgs,
    @Args() id: IdArgs
  ): Promise<UpdateResult | undefined> {
    return await this.usersService.updateUser(body, id);
  }

  @Mutation(() => UserDeleteDTO, {
    description: 'Delete user',
    name: 'Delete_User',
  })
  public async deleteUser(@Args() id: IdArgs): Promise<UserDeleteDTO> {
    const deleteResult = await this.usersService.deleteUser(id);
    return { affected: deleteResult.affected ?? 0 };
  }
}
