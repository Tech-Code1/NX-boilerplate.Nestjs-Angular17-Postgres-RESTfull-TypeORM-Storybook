import { BLOCKED_TIME, ROLES } from '@db/constants';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { LastUpdatedBy } from '../../decorators/lastUpdateBy.decorator';
import { IUser } from '../interfaces/user.interface';
import { UsersProjects } from './';
import { BaseEntity } from './base.entity';

// extends Base
@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @Column({ type: 'text', nullable: true })
  firstName!: string;

  @Column({ type: 'text', nullable: true })
  lastName!: string;

  @Column({ type: 'integer', nullable: true })
  age!: number;

  @Column({
    type: 'text',
    unique: true,
  })
  email!: string;

  @Column({ type: 'text', unique: true })
  username!: string;

  /* @Field(() => String, {
    description: 'User password',
  }) */
  @Exclude()
  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'boolean', default: false })
  isBlocked!: boolean;

  @Column({ type: 'enum', enum: BLOCKED_TIME, nullable: true })
  timeBlocked!: BLOCKED_TIME;

  @Column({ type: 'text', default: [ROLES.USER], array: true })
  roles!: ROLES[];

  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.user)
  projectsIncludes!: UsersProjects[];

  @LastUpdatedBy(User)
  lastUpdateBy!: User;
}
