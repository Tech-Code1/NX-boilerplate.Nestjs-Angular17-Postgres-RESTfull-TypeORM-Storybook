import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * BaseEntity class.
 */
export abstract class BaseEntity {
	/** @member {Date} createdAt - the create date */
	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP'
	})
	createdAt!: Date;

	/** @member {Date} updatedAt - the update date */
	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP'
	})
	updatedAt!: Date;

	/** @member {Date} deletedAt - the delete date */
	@DeleteDateColumn({
		name: 'deleted_at',
		type: 'timestamp',
		nullable: true,
		default: null
	})
	deletedAt!: Date;
}