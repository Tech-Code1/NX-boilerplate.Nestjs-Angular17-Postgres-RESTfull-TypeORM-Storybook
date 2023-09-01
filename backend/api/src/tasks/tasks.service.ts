import { Task } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { ErrorManager } from '../utils/response.manager';
import { CreateTaskDTO } from './dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly projectService: ProjectsService
  ) {}

  public async createTask(createTask: CreateTaskDTO): Promise<Task> {
    const { id } = createTask;
    try {
      const project = await this.projectService.findProjectById(id);

      return await this.taskRepository.save({
        ...createTask,
        project,
      });
    } catch (error) {
      console.log(error, 'error');

      throw ErrorManager.createError(error);
    }
  }
}
