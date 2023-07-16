import { UsersProjects } from '@db/entities';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { ProjectDoc, UsersProjectsDoc } from './decorators';
import { UsersProjectsService } from './users-projects.service';

@ApiTags('users-projects')
@Controller('users-projects')
@UseGuards(JwtAuthGuard)
export class UsersProjectsController {
  constructor(private readonly usersProjectsService: UsersProjectsService) {}

  @Get()
  @UsersProjectsDoc()
  async getUsersProjects(): Promise<UsersProjects[]> {
    return this.usersProjectsService.findAll();
  }

  @Get(':id')
  @ProjectDoc()
  async findProjectsByUser(@Param('id') id: string) {
    return this.usersProjectsService.findProjectsByUser(id);
  }
}
