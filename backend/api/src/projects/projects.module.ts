import { Project, UsersProjects } from '@db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, UsersProjects])],
  providers: [ProjectsService, UsersService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
