import { BLOCKED_TIME, ROLES } from '@db/constants';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity, UsersProjects } from './';

registerEnumType(ROLES, {
  name: 'ROLES',
});

registerEnumType(BLOCKED_TIME, {
  name: 'BLOCKED_TIME',
});

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @Field(() => String, {
    description: 'User name',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  firstName!: string;

  @Field(() => String, {
    description: 'User last name',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  lastName!: string;

  @Field(() => Int, {
    description: 'User age',
    nullable: true,
  })
  @Column({ type: 'integer', nullable: true })
  age!: number;

  @Field(() => String, {
    description: 'User mail',
  })
  @Column({
    type: 'text',
    unique: true,
  })
  email!: string;

  @Field(() => String, {
    description: 'User nickname',
  })
  @Column({ type: 'text', unique: true })
  username!: string;

  /* @Field(() => String, {
    description: 'User password',
  }) */
  @Exclude()
  @Column({ type: 'text' })
  password!: string;

  @Field(() => Boolean, {
    description: 'Active or deleted user',
  })
  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Field(() => Boolean, {
    description: 'Ban user for breaking rules',
  })
  @Column({ type: 'boolean', default: false })
  isBlocked!: boolean;

  @Field(() => BLOCKED_TIME, {
    description: 'Lock time',
    nullable: true,
  })
  @Column({ type: 'enum', enum: BLOCKED_TIME, nullable: true })
  timeBlocked!: BLOCKED_TIME;

  @Field(() => ROLES, {
    description: 'User roles',
  })
  @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
  role!: ROLES;

  @Field(() => [UsersProjects], { nullable: true })
  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.user)
  projectsIncludes!: UsersProjects[];
}
