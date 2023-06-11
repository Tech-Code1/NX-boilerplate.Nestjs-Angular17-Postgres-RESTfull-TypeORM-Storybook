import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../../constants/interfaces.entities';
import { BaseEntity } from './base.entity';
import { IUser } from '../interfaces/user.interface';
import { IProject } from '../interfaces/project.interface';
import { UsersProjects } from './usersProjects.entity';

@Entity({ name: 'projects' })
export class Projects extends BaseEntity implements IProject {	
	@ApiProperty({
		example: 'Comfeco',
		description: 'Project name'
	})
	@Column('text')
	name!: string;

	@ApiProperty({
		example: 'Comfeco is a programming event...',
		description: 'Project description'
	})
	@Column('text')
	description!: string;

    @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.project)
    usersIncludes!: UsersProjects[]
}