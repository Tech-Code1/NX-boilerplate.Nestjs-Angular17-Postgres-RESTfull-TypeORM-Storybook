import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SEED_DATA } from '../../../config/constants';
import { Project, Task } from '../src/lib/entities';

export default class TaskSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(Project);
    const allProjects = await repository.find();

    if (allProjects.length === 0) {
      throw new Error('There are no projects');
    }

    const taskFactory = await factoryManager.get(Task);
    for (let i = 0; i < SEED_DATA; i++) {
      // select a random project from the project list
      const randomProject =
        allProjects[Math.floor(Math.random() * allProjects.length)];
      await taskFactory.save({ project: randomProject });
    }
  }
}
