import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EValidRoles } from '../interfaces/interfaces.entities';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@ApiProperty({
		example: 'ef549097-0214-43bb-9cce-ff1390e76d02',
		description: 'Id del usuario',
		uniqueItems: true,
		required: false,
		type: String
	})
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ApiProperty({
		example: 'jhondoe@hotmail.com',
		description: 'Correo del usuario'
	})
	@Column('text', {
		unique: true
	})
	email!: string;

	@ApiProperty({
		example: '123456',
		description: 'Contraseña del usuario'
	})
	@Column('text', { select: false })
	password!: string;

	@ApiProperty({
		example: 'jhonDoe',
		description: 'Apodo del usuario'
	})
	@Column('text', { unique: true })
	nick!: string;

	@ApiProperty({
		example: 'Informatica',
		description: 'Area en el que se especializa el usuario'
	})

	@ApiProperty({
		example: true,
		description: 'Usuario activo o eliminado',
		uniqueItems: false,
		default: true,
		required: false,
		type: Boolean
	})
	@Column('bool', { default: true })
	isActive!: boolean;

	@ApiProperty({
		example: 'user',
		description: 'Roles del usuario',
		uniqueItems: false,
		default: ['user'],
		required: false,
		enum: EValidRoles,
		isArray: true
	})
	@Column('text', { array: true, default: ['user'] })
	roles!: string[];
}