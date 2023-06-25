import { Project, Task } from '@db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from '../projects/projects.service';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  providers: [TasksService, ProjectsService, TasksResolver],
  controllers: [],
})
export class TasksModule {}
