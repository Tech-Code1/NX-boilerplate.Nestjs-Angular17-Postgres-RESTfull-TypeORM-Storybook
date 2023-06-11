import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import InitSeeder from '../backend/database/seeders/init.seeders';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './constants';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const options = {
		type: 'postgres',
		host: String(DB_HOST),
		port: parseInt(String(DB_PORT), 10) || 5432,
		database: DB_NAME,
		username: DB_USER,
		password: DB_PASS,
		entities: [join(__dirname, '/backend/database/src/lib/entities/**/*.entity.ts')],
		migrationsRun: true,
		migrations: [join(__dirname, '/../backend/database/migrations/**/*.ts')],
		namingStrategy: new SnakeNamingStrategy(),
		migrationsTableName: 'migrations',
		seeds: [InitSeeder],
		// Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
		synchronize: false
		//logging: false,
		//logger: 'file'
};

export const dataSource = new DataSource(
	options as DataSourceOptions & SeederOptions,
);