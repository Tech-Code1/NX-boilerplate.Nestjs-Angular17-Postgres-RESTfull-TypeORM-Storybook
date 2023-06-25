import { ROLES } from '@db/constants';
import { Project, User, UsersProjects } from '@db/entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards';
import { IdArgs } from '../common/dto/args/id.args';
import { CreateProjectInput } from './dto/inputs/create-project.input';
import { ProjectUpdateInput } from './dto/inputs/update-project.input';
import { ProjectsService } from './projects.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class ProjectsResolver {
  constructor(private readonly projectService: ProjectsService) {}

  @Mutation(() => UsersProjects, {
    description: 'Create project and assign access level to user',
    name: 'Create_Project',
  })
  public async userInProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @CurrentUser([ROLES.ADMIN, ROLES.USER]) user: User
  ): Promise<UsersProjects> {
    return await this.projectService.createProject(createProjectInput, user.id);
  }

  @Query(() => [Project], {
    description: 'Find all projects',
    name: 'All_Projects',
  })
  public async findAllProjects(
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Query(() => Project, {
    description: 'Find specific project by his ID',
    name: 'One_Project',
  })
  public async findUserById(
    @Args() { id }: IdArgs,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<Project> {
    return await this.projectService.findProjectById(id);
  }

  @Mutation(() => Project, {
    description: 'Edit project',
    name: 'Edit_Project',
  })
  public async updateUser(
    @Args('projectUpdateInput') projectUpdateInput: ProjectUpdateInput,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<Project> {
    return await this.projectService.updateProject(
      projectUpdateInput,
      projectUpdateInput.id
    );
  }

  @Mutation(() => Project, {
    description: 'Delete project',
    name: 'Delete_Project',
  })
  public async deleteProject(
    @Args() { id }: IdArgs,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<Project> {
    return await this.projectService.deleteProject(id);
  }
}
