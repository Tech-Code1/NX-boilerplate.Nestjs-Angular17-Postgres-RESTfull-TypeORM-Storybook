import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SEED_DATA } from '../../../config/constants';
import { Project } from '../src/lib/entities';

export default class ProjectSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const projectFactory = await factoryManager.get(Project);

    // save 10 factory generated entities, to the database
    await projectFactory.saveMany(SEED_DATA);
  }
}
