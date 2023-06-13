import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ACCES_LEVEL } from '../../constants/interfaces.entities';
import { BaseEntity } from './base.entity';
import { Projects } from './projects.entity';
import { Users } from './user.entity';

@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
  @ApiProperty({
    example: 'OWNER',
    description: 'User acces level',
    uniqueItems: false,
    default: ['OWNER'],
    required: false,
    enum: ACCES_LEVEL,
  })
  @Column({ type: 'enum', enum: ACCES_LEVEL })
  accesLevel!: ACCES_LEVEL;

  @ManyToOne(() => Users, (user) => user.projectsIncludes)
  user!: Users;

  @ManyToOne(() => Projects, (project) => project.usersIncludes)
  project!: Projects;
}
