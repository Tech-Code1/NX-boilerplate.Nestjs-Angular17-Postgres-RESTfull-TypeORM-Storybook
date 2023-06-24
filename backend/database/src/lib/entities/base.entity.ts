import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * BaseEntity class.
 */
@ObjectType()
export abstract class BaseEntity {
  /** @member {Date} id - the id date */
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** @member {Date} createdAt - the create date */
  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  /** @member {Date} updatedAt - the update date */
  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  /** @member {Date} deletedAt - the delete date */
  @Field(() => Date)
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  deletedAt!: Date;
}
