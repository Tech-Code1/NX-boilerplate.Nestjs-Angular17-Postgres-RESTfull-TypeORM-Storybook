import { setSeederFactory } from 'typeorm-extension';
import { ACCES_LEVEL } from '../src/constants/interfaces.entities';
import { UsersProjects } from '../src/lib/entities/usersProjects.entity';

export default setSeederFactory(UsersProjects, async (faker) => {
  const usersProject = new UsersProjects();

  usersProject.accesLevel = faker.helpers.arrayElement([
    ACCES_LEVEL.OWNER,
    ACCES_LEVEL.MANTEINER,
    ACCES_LEVEL.DEVELOPER,
  ]);

  return usersProject;
});
