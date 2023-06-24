import { Project, UsersProjects } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ACCES_LEVEL } from '../../../database/src/constants/interfaces.entities';
import { UsersService } from '../users/users.service';
import { ErrorManager } from '../utils/error.manager';
import { CreateProjectInput } from './dto/inputs/create-project.input';
import { ProjectUpdateDTO } from './dto/projects.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(UsersProjects)
    private readonly userProjectRepository: Repository<UsersProjects>,
    private readonly userService: UsersService
  ) {}

  public async createProject(
    createProjectInput: CreateProjectInput,
    userId: string
  ): Promise<UsersProjects> {
    try {
      const user = await this.userService.findUserById(userId);
      const project = await this.projectRepository.save(createProjectInput);

      const usersProjects = await this.userProjectRepository.save({
        accesLevel: ACCES_LEVEL.OWNER,
        user,
        project,
      });

      return usersProjects;
    } catch (error) {
      throw ErrorManager.createError(error);
    }
  }

  public async findProjects(): Promise<Project[]> {
    try {
      const projects: Project[] = await this.projectRepository.find();
      if (projects.length === 0) {
        throw ErrorManager.createError({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async findProjectById(id: string): Promise<Project> {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .getOne();
      if (!project) {
        throw ErrorManager.createError({
          type: 'BAD_REQUEST',
          message: 'No existe proyecto con el id ' + id,
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async updateProject(
    body: ProjectUpdateDTO,
    id: string
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body
      );
      if (project.affected === 0) {
        throw ErrorManager.createError({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar proyecto',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);
      if (project.affected === 0) {
        throw ErrorManager.createError({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar proyecto',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }
}
