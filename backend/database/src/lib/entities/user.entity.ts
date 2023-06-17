import { ROLES } from '@db/constants';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from './base.entity';
import { UsersProjects } from './usersProjects.entity';

registerEnumType(ROLES, {
  name: 'ROLES',
});

@ObjectType()
@Entity({ name: 'users' })
export class Users extends BaseEntity implements IUser {
  @Field(() => String, {
    description: 'User name',
  })
  @Column('text')
  firstName!: string;

  @Field(() => String, {
    description: 'User last name',
  })
  @Column('text')
  lastName!: string;

  @Field(() => Int, {
    description: 'User age',
  })
  @Column('number')
  age!: number;

  @Field(() => String, {
    description: 'User mail',
  })
  @Column('text', {
    unique: true,
  })
  email!: string;

  @Field(() => String, {
    description: 'User nickname',
  })
  @Column('text', { unique: true })
  username!: string;

  @Field(() => String, {
    description: 'User password',
  })
  @Exclude()
  @Column('text', { select: false })
  password!: string;

  @Field(() => Boolean, {
    description: 'Active or deleted user',
  })
  @Column('bool', { default: true })
  isActive!: boolean;

  @Field(() => ROLES, {
    description: 'User roles',
  })
  @Column({ type: 'enum', enum: ROLES })
  role!: ROLES;

  @Field(() => [UsersProjects])
  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.user)
  projectsIncludes!: UsersProjects[];
}
