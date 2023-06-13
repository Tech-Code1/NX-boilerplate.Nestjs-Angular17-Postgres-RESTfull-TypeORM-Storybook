import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AccessLevel } from '../../auth/decorators';
import { AccessLevelGuard, AuthGuard, RolesGuard } from '../../auth/guards';
import { TasksDTO } from '../dto/tasks.dto';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @AccessLevel('DEVELOPER')
  @Post('create/:projectId')
  public async createTask(
    @Body() body: TasksDTO,
    @Param('projectId') projectId: string
  ) {
    return this.tasksService.createTask(body, projectId);
  }
}
