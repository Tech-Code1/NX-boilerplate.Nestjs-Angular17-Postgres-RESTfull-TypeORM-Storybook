import { setSeederFactory } from 'typeorm-extension';
import { Project } from '../src/lib/entities';

export default setSeederFactory(Project, async (faker) => {
  const project = new Project();

  project.name = faker.commerce.productName();
  project.description = faker.commerce.productDescription();

  return project;
});
