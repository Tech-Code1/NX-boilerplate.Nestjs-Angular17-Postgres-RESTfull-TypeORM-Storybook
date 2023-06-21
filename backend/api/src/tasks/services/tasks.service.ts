import { Tasks } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from '../../projects/services/projects.service';
import { ErrorManager } from '../../utils/error.manager';
import { TasksDTO } from '../dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
    private readonly projectService: ProjectsService
  ) {}

  public async createTask(body: TasksDTO, projectId: string): Promise<Tasks> {
    try {
      const project = await this.projectService.findProjectById(projectId);
      if (project === undefined) {
        throw ErrorManager.createError({
          type: 'NOT_FOUND',
          message: 'No se ha encontrado el proyecto',
        });
      }
      return await this.taskRepository.save({
        ...body,
        project,
      });
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }
}
