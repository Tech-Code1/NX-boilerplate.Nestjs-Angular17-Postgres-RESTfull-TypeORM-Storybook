import { ACCES_LEVEL } from '@db/constants';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity, Project, User } from './';

@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
  @Column({ type: 'enum', enum: ACCES_LEVEL })
  accesLevel!: ACCES_LEVEL;

  @ManyToOne(() => User, (user) => user.projectsIncludes)
  user!: User;

  @ManyToOne(() => Project, (project) => project.usersIncludes)
  project!: Project;
}
