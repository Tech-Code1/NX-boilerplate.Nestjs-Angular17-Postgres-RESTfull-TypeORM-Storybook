import { hashSync } from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../src/lib/entities/user.entity';
import { EValidRoles} from '../src/constants/interfaces.entities';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    const data = {
        id: uuidv4(),
        email: 'jhonDoe@gmail.com',
        password: await hashSync('123456789', 10),
        nick: 'jhonDoe',
        isActive: true,
        roles: [EValidRoles.USER],
    };

    const user = await repository.findOneBy({ email: data.email });

    if (!user) {
      await repository.insert([data]);
    }

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(User);
    // save 10 factory generated entities, to the database
    await userFactory.saveMany(10);
  }
}