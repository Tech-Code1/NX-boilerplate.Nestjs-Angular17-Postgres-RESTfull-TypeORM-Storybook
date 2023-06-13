import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { IProject } from '../interfaces/project.interface';
import { BaseEntity } from './base.entity';
import { Tasks } from './tasks.entity';
import { UsersProjects } from './usersProjects.entity';

@Entity({ name: 'projects' })
export class Projects extends BaseEntity implements IProject {
  @ApiProperty({
    example: 'Comfeco',
    description: 'Project name',
  })
  @Column('text')
  name!: string;

  @ApiProperty({
    example: 'Comfeco is a programming event...',
    description: 'Project description',
  })
  @Column('text')
  description!: string;

  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.project)
  usersIncludes!: UsersProjects[];

  @OneToMany(() => Tasks, (tasks) => tasks.project)
  tasks!: Tasks[];
}
