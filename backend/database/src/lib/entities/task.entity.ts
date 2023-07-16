import { STATUS_TASK } from '@db/constants';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from '.';
import { BaseEntity } from './base.entity';

// extends Base
@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @Column()
  taskName!: string;

  @Column()
  taskDescription!: string;

  @Column({ type: 'enum', enum: STATUS_TASK })
  status!: STATUS_TASK;

  @Column()
  responsableName!: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({
    name: 'project-id',
  })
  project!: Project;
}
