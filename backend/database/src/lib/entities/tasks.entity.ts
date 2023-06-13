import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { STATUS_TASK } from '../../../../shared/constants/status-tasks';
import { BaseEntity } from './base.entity';
import { Projects } from './projects.entity';

@Entity({ name: 'task' })
export class Tasks extends BaseEntity {
  @Column()
  taskName!: string;

  @Column()
  taskDescription!: string;

  @Column({ type: 'enum', enum: STATUS_TASK })
  status!: STATUS_TASK;

  @Column()
  responsableName!: string;
  @ManyToOne(() => Projects, (project) => project.tasks)
  @JoinColumn({
    name: 'project_id',
  })
  project!: Projects;
}
