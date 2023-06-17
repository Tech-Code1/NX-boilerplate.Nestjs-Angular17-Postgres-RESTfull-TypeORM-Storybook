import { Projects } from '@db/entities';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { STATUS_TASK } from '../../../../shared/constants/status-tasks';
import { BaseEntity } from './base.entity';

registerEnumType(STATUS_TASK, {
  name: 'STATUS_TASK',
});

@ObjectType()
@Entity({ name: 'task' })
export class Tasks extends BaseEntity {
  @Field(() => String)
  @Column()
  taskName!: string;

  @Field(() => String)
  @Column()
  taskDescription!: string;

  @Field(() => STATUS_TASK)
  @Column({ type: 'enum', enum: STATUS_TASK })
  status!: STATUS_TASK;

  @Field(() => String)
  @Column()
  responsableName!: string;

  @Field(() => Projects)
  @ManyToOne(() => Projects, (project) => project.tasks)
  @JoinColumn({
    name: 'project_id',
  })
  project!: Projects;
}
