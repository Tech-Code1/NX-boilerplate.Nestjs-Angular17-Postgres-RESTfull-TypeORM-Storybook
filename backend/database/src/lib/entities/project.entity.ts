import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Tasks, UsersProjects } from '.';
import { IProject } from '../interfaces/project.interface';
import { BaseEntity } from './base.entity';

// extends Base
@ObjectType()
@Entity({ name: 'project' })
export class Project extends BaseEntity implements IProject {
  @Field(() => String)
  @Column('text')
  name!: string;

  @Field(() => String)
  @Column('text')
  description!: string;

  @Field(() => [UsersProjects], { nullable: 'itemsAndList' })
  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.project)
  usersIncludes!: UsersProjects[];

  @Field(() => [Tasks], { nullable: 'itemsAndList' })
  @OneToMany(() => Tasks, (tasks) => tasks.project)
  tasks!: Tasks[];
}
