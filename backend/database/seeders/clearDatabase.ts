import { dataSource } from '../../../config/orm.config';

async function clearDatabase() {
  await dataSource.initialize();

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query('TRUNCATE TABLE "task" CASCADE');
    await queryRunner.query('TRUNCATE TABLE "users" CASCADE');
    await queryRunner.query('TRUNCATE TABLE "project" CASCADE');

    await queryRunner.commitTransaction();
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
}

clearDatabase().then(() => console.log('Database cleared!'));
