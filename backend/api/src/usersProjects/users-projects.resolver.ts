import { UsersProjects } from '@db/entities';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards';
import { IdArgs } from '../common/dto/args';
import { UsersProjectsService } from './users-projects.service';

@Resolver(() => UsersProjects)
@UseGuards(JwtAuthGuard)
export class UsersProjectsResolver {
  constructor(private usersProjectsService: UsersProjectsService) {}

  @Query(() => [UsersProjects], {
    description: 'I consult all the users and projects I have',
    name: 'Users_Projects',
  })
  async getUsersProjects(): Promise<UsersProjects[]> {
    return this.usersProjectsService.findAll();
  }

  @Query(() => [UsersProjects], {
    description: 'Query a project by a specific user',
    name: 'User_In_Projects',
  })
  async findProjectsByUser(@Args() { id }: IdArgs) {
    return this.usersProjectsService.findProjectsByUser(id);
  }
}
