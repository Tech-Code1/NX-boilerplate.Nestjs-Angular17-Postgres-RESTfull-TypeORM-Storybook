import { Projects, Users } from '@db/entities';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ACCES_LEVEL } from '../../constants/interfaces.entities';
import { BaseEntity } from './base.entity';

registerEnumType(ACCES_LEVEL, {
  name: 'ACCES_LEVEL',
});

@ObjectType()
@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
  @Field(() => ACCES_LEVEL)
  @Column({ type: 'enum', enum: ACCES_LEVEL })
  accesLevel!: ACCES_LEVEL;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.projectsIncludes)
  user!: Users;

  @Field(() => Projects)
  @ManyToOne(() => Projects, (project) => project.usersIncludes)
  project!: Projects;
}
