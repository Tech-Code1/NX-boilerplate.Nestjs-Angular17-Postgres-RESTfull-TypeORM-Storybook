import { ACCES_LEVEL } from '@db/constants';
import { Project, UsersProjects } from '@db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Resp } from '../utils/response.manager';
import { CreateProjectDTO, ProjectUpdateDTO } from './dto';

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
    createProject: CreateProjectDTO,
    userId: string
  ): Promise<UsersProjects> {
    try {
      const user = await this.userService.findUserById(userId);
      const project = await this.projectRepository.save(createProject);

      const usersProjects = await this.userProjectRepository.save({
        accesLevel: ACCES_LEVEL.OWNER,
        user,
        project,
      });

      return usersProjects;
    } catch (error) {
      throw Resp.Error(error);
    }
  }

  public async findAll(
    limit: number,
    offset: number,
    search: string
  ): Promise<Project[]> {
    try {
      const queryBuilder = await this.projectRepository
        .createQueryBuilder()
        .take(limit)
        .skip(offset);

      if (search) {
        queryBuilder.where('LOWER(name) like :name', {
          name: `%${search.toLowerCase()}%`,
        });
      }

      const projects = await queryBuilder.getMany();

      if (projects.length === 0) {
        throw Resp.Error('BAD_REQUEST', 'No se encontro resultado');
      }
      return projects;
    } catch (error) {
      throw Resp.Error(error);
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
        throw Resp.Error(
          'BAD_REQUEST',
          'The project with the id does not exist: ' + id
        );
      }
      return project;
    } catch (error) {
      throw Resp.Error(error);
    }
  }

  public async updateProject(
    projectUpdate: ProjectUpdateDTO,
    id: string
  ): Promise<Project> {
    try {
      await this.projectRepository.update(id, projectUpdate);

      const updatedProject = await this.projectRepository.findOne({
        where: { id },
      });

      if (!updatedProject) {
        throw new Resp.Error('NOT_FOUND', `Project with ID "${id}" not found`);
      }

      return updatedProject;
    } catch (error) {
      throw Resp.Error(error.message);
    }
  }

  public async deleteProject(id: string): Promise<Project> {
    try {
      const project = await this.findProjectById(id);
      await this.userProjectRepository
        .createQueryBuilder()
        .delete()
        .where('project_id = :project_id', { project_id: id })
        .execute();

      await this.projectRepository.delete(id);

      return project;
    } catch (error) {
      throw Resp.Error(error.message);
    }
  }
}
