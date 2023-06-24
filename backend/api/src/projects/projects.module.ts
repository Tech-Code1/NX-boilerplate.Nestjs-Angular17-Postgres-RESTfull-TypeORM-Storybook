import { Project, UsersProjects } from '@db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, UsersProjects])],
  providers: [ProjectsService, UsersService, ProjectsResolver],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
