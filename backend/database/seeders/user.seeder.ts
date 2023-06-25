import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SEED_DATA } from '../../../config/constants';
import { User } from '../src';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = await factoryManager.get(User);
    // save 10 factory generated entities, to the database
    await userFactory.saveMany(SEED_DATA);
  }
}
