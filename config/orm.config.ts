import { Project, Task, Token, User, UsersProjects } from '@db/entities';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import InitSeeder from '../backend/database/seeders/init.seeders';
import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_SYNC,
  DB_USER,
} from './constants';

export const options = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  entities: [User, Project, Task, UsersProjects, Token], // *works on windows
  // entities: [
  // join(__dirname, '/../backend/database/src/lib/entities/**/*.entity.ts'),
  // ],
  migrationsRun: true,
  migrations: [
    join(__dirname, '/../backend/database/src/lib/migrations/**/*.ts'),
  ],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: 'migration',
  seeds: [InitSeeder],
  // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
  synchronize: DB_SYNC,
  //logging: false,
  //logger: 'file'
};

export const dataSource = new DataSource(
  options as DataSourceOptions & SeederOptions
);
