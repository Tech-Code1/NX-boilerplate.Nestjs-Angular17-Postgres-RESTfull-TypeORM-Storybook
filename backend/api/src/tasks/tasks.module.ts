import { Project, Tasks } from '@db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from '../projects/projects.service';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, Project])],
  providers: [TasksService, ProjectsService],
  controllers: [TasksController],
})
export class TasksModule {}
