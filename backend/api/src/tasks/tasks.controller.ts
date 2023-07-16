import { ROLES } from '@db/constants';
import { Task, User } from '@db/entities';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards';
import { CreateTaskDoc } from './decorators';
import { CreateTaskDTO } from './dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @CreateTaskDoc()
  public async createTask(
    @Body() createTask: CreateTaskDTO,
    @CurrentUser([ROLES.ADMIN, ROLES.USER]) user: User
  ): Promise<Task> {
    return await this.tasksService.createTask(createTask);
  }
}
