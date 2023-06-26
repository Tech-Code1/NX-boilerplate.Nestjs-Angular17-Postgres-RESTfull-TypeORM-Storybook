import { ROLES } from '@db/constants';
import { Task, User } from '@db/entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards';
import { CreateTaskInput, IdProject } from './dto/inputs';
import { TasksService } from './tasks.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task, {
    description: 'Create task associated with a project',
    name: 'Create_Task',
  })
  public async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @Args('IdProject') IdProject: IdProject,
    @CurrentUser([ROLES.ADMIN, ROLES.USER]) user: User
  ): Promise<Task> {
    return await this.tasksService.createTask(createTaskInput, IdProject);
  }
}
