import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import {
  projectFactory,
  taskFactory,
  userFactory,
  usersProjectsFactory,
} from '../factories';
import { ProjectSeeder, TaskSeeder, UserSeeder, UsersProjectsSeeder } from './';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, ProjectSeeder, TaskSeeder, UsersProjectsSeeder],
      factories: [
        userFactory,
        projectFactory,
        taskFactory,
        usersProjectsFactory,
      ],
    });
  }
}
