import { ACCES_LEVEL } from '@db/constants';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity, Projects, User } from './';

@ObjectType()
@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
  @Field(() => ACCES_LEVEL)
  @Column({ type: 'enum', enum: ACCES_LEVEL })
  accesLevel!: ACCES_LEVEL;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.projectsIncludes)
  user!: User;

  @Field(() => Projects)
  @ManyToOne(() => Projects, (project) => project.usersIncludes)
  project!: Projects;
}
