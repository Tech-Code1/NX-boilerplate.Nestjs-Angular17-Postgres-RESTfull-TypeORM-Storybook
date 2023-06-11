import { setSeederFactory } from 'typeorm-extension';
import { ACCES_LEVEL } from '../src/constants/interfaces.entities';
import { UsersProjects } from '../src/lib/entities/usersProjects.entity';

export default setSeederFactory(UsersProjects, async (faker) => {
  const usersProject = new UsersProjects();

  usersProject.accesLevel = [faker.helpers.arrayElement([ACCES_LEVEL.OWNER, ACCES_LEVEL.MANTEINER])];

  // Suponiendo que tienes funciones para generar entidades Users y Projects
  //usersProject.user = await generateUser();
  //usersProject.project = await generateProject();

  return usersProject;
});

 async function generateUserEntity() {
     //const user = await generateUser();
     // Aquí puedes hacer cualquier manipulación adicional necesaria
     // Por ejemplo, podrías guardar el usuario en la base de datos
     // await userRepository.save(user);
     // return user;
   }
  
   async function generateProjectEntity() {
     //const project = await generateProject();
     // Aquí puedes hacer cualquier manipulación adicional necesaria
     // Por ejemplo, podrías guardar el proyecto en la base de datos
     // await projectRepository.save(project);
     // return project;
   }
