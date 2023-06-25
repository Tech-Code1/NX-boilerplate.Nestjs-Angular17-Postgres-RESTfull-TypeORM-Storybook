import { Task } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { ErrorManager } from '../utils/error.manager';
import { CreateTaskInput, IdProject } from './dto/inputs';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly projectService: ProjectsService
  ) {}

  public async createTask(
    createTaskInput: CreateTaskInput,
    { id }: IdProject
  ): Promise<Task> {
    try {
      const project = await this.projectService.findProjectById(id);

      return await this.taskRepository.save({
        ...createTaskInput,
        project,
      });
    } catch (error) {
      throw ErrorManager.createError(error);
    }
  }
}
