import { hashSync } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';
import { v4 as uuidv4 } from 'uuid';
import { Users } from '../src';
import { ROLES } from '../src/constants/interfaces.entities';

export default setSeederFactory(Users, async (faker) => {
  const user = new Users();

  user.id = faker.helpers.fake(uuidv4());
  user.email = faker.internet.email();
  user.password = hashSync(faker.internet.password(), 10);
  user.username = faker.name.firstName();
  user.age = faker.number.int({ min: 18, max: 100 });
  user.isActive = faker.datatype.boolean();
  user.role = faker.helpers.arrayElement([
    ROLES.USER,
    ROLES.ADMIN,
    ROLES.PREMIUM,
  ]);
  user.createdAt = new Date();
  user.updatedAt = faker.date.future({ refDate: user.createdAt });
  user.deletedAt = faker.date.future({ refDate: user.updatedAt });

  return user;
});
