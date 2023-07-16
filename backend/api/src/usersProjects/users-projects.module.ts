import { UsersProjects } from '@db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProjectsController } from './users-projects.controller';
import { UsersProjectsService } from './users-projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersProjects])],
  providers: [UsersProjectsService],
  controllers: [UsersProjectsController],
})
export class UsersProjectsModule {}
