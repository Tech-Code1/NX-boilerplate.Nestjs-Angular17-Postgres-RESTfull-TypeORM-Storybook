import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { ROLES } from '../../constants/interfaces.entities';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from './base.entity';
import { UsersProjects } from './usersProjects.entity';

@Entity({ name: 'users' })
export class Users extends BaseEntity implements IUser {
  @ApiProperty({
    example: 'jhon',
    description: 'User name',
  })
  @Column('text')
  firstName!: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  @Column('text')
  lastName!: string;

  @ApiProperty({
    example: '18',
    description: 'User age',
  })
  @Column('number')
  age!: number;

  @ApiProperty({
    example: 'jhondoe@hotmail.com',
    description: 'User mail',
  })
  @Column('text', {
    unique: true,
  })
  email!: string;

  @ApiProperty({
    example: 'jhonDee',
    description: 'User nickname',
  })
  @Column('text', { unique: true })
  username!: string;

  @ApiProperty({
    example: '123456',
    description: 'User password',
  })
  @Exclude()
  @Column('text', { select: false })
  password!: string;

  @ApiProperty({
    example: true,
    description: 'Active or deleted user',
    uniqueItems: false,
    default: true,
    required: false,
    type: Boolean,
  })
  @Column('bool', { default: true })
  isActive!: boolean;

  @ApiProperty({
    example: 'user',
    description: 'User roles',
    uniqueItems: false,
    default: ['user'],
    required: false,
    enum: ROLES,
    isArray: true,
  })
  @Column({ type: 'enum', enum: ROLES })
  role!: ROLES;

  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.user)
  projectsIncludes!: UsersProjects[];
}
