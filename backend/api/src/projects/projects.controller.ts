import { ROLES } from '@db/constants';
import { User } from '@db/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Project, UsersProjects } from '../../../database/src/lib/entities';
import { CurrentUser } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards';
import {
  CreateProjectDoc,
  EditProjectDoc,
  ProjectDoc,
  ProjectsDoc,
} from './decorators';
import { DeleteProjectDoc } from './decorators/swagger/delete-project.decorator';
import { CreateProjectDTO, ProjectUpdateDTO } from './dto';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post()
  @CreateProjectDoc()
  public async userInProject(
    @Body() createProjectInput: CreateProjectDTO,
    @CurrentUser([ROLES.ADMIN, ROLES.USER]) user: User
  ): Promise<UsersProjects> {
    return await this.projectService.createProject(createProjectInput, user.id);
  }

  @Get()
  @ProjectsDoc()
  public async findAllProjects(
    @CurrentUser([ROLES.ADMIN]) user: User,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('search') search: string
  ): Promise<Project[]> {
    return await this.projectService.findAll(limit, offset, search);
  }

  @Get(':id')
  @ProjectDoc()
  public async findProjectById(
    @Param('id') id: string,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<Project> {
    return await this.projectService.findProjectById(id);
  }

  @Put(':id')
  @EditProjectDoc()
  public async updateProject(
    @Body() projectUpdate: ProjectUpdateDTO,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<Project> {
    return await this.projectService.updateProject(
      projectUpdate,
      projectUpdate.id
    );
  }

  @Delete(':id')
  @DeleteProjectDoc()
  public async deleteProject(
    @Param('id') id: string,
    @CurrentUser([ROLES.ADMIN]) user: User
  ): Promise<Project> {
    return await this.projectService.deleteProject(id);
  }
}
