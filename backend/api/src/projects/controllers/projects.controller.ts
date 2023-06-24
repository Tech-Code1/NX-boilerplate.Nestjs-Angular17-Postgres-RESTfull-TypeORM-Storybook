import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsService } from '../projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':projectId')
  public async findProjectById(
    @Param('projectId', new ParseUUIDPipe()) id: string
  ) {
    return await this.projectService.findProjectById(id);
  }

  @Put('edit/:projectId')
  public async updateProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
    @Body() body: ProjectUpdateDTO
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @Delete('delete/:projectId')
  public async deleteProject(
    @Param('projectId', new ParseUUIDPipe()) id: string
  ) {
    return await this.projectService.deleteProject(id);
  }
}
