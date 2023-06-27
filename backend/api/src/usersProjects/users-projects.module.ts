import { UsersProjects } from '@db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProjectsResolver } from './users-projects.resolver';
import { UsersProjectsService } from './users-projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersProjects])],
  providers: [UsersProjectsService, UsersProjectsResolver],
  controllers: [],
})
export class UsersProjectsModule {}
