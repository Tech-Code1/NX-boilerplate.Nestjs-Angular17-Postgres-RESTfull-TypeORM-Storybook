import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});
/*
 * Esta variable nos devolvera la configuración de typeorm
 */
export const TYPEORM_CONFIG = 'database';
/*
 * Ahora usaremos las variables sin el process.env
 */
export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
