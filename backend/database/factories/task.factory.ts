import { setSeederFactory } from 'typeorm-extension';
import { STATUS_TASK } from '../src/constants/interfaces.entities';
import { Task } from '../src/lib/entities/task.entity';

export default setSeederFactory(Task, async (faker) => {
  const task = new Task();

  task.taskName = faker.company.name();
  task.taskDescription = faker.company.catchPhraseDescriptor();
  task.status = faker.helpers.arrayElement([
    STATUS_TASK.CREATED,
    STATUS_TASK.FINISH,
    STATUS_TASK.IN_PROGRESS,
  ]);
  task.responsableName = faker.person.fullName();

  return task;
});
