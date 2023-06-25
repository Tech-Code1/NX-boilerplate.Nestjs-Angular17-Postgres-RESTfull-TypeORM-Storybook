import { hashSync } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../src';
import { ROLES } from '../src/constants/interfaces.entities';

export default setSeederFactory(User, async (faker) => {
  const user = new User();

  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.age = faker.number.int({ min: 18, max: 100 });
  user.email = faker.internet.email();
  user.username = faker.internet.userName();
  user.password = hashSync('123456', 10);
  user.roles = [
    faker.helpers.arrayElement([ROLES.USER, ROLES.ADMIN, ROLES.PREMIUM]),
  ];

  return user;
});
