import { setSeederFactory } from 'typeorm-extension';
import { Projects } from '../src/lib/entities/projects.entity';

export default setSeederFactory(Projects, async (faker) => {
  const project = new Projects();

  project.name = faker.commerce.productName();
  project.description = faker.commerce.productDescription();

  // Suponiendo que tienes una función para generar entidades UsersProjects
  // project.usersIncludes = await generateUsersProjects();

  return project;
});

async function generateUsersProjects() {
  // Aquí deberías implementar la lógica para generar las entidades UsersProjects
  // que estén relacionadas con tu proyecto.
  // Esta función debería devolver un arreglo de entidades UsersProjects.
}
