import { Column, Entity, OneToMany } from 'typeorm';
import { Task, UsersProjects } from '.';
import { IProject } from '../interfaces/project.interface';
import { BaseEntity } from './base.entity';

// extends Base
@Entity({ name: 'project' })
export class Project extends BaseEntity implements IProject {
  @Column('text')
  name!: string;

  @Column('text')
  description!: string;

  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.project)
  usersIncludes!: UsersProjects[];

  @OneToMany(() => Task, (tasks) => tasks.project)
  tasks!: Task[];
}
