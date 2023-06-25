import { Controller, Delete, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProjectsService } from '../projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get(':projectId')
  public async findProjectById(
    @Param('projectId', new ParseUUIDPipe()) id: string
  ) {
    return await this.projectService.findProjectById(id);
  }

  @Delete('delete/:projectId')
  public async deleteProject(
    @Param('projectId', new ParseUUIDPipe()) id: string
  ) {
    return await this.projectService.deleteProject(id);
  }
}
