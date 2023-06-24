import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: `./environments/.${process.env.NODE_ENV}.env`,
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
export const DB_PORT = parseInt(String(process.env.DB_PORT)) || 5432;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_SYNC = Boolean(process.env.DB_SYNC);
export const HASH_SALT = parseInt(String(process.env.HASH_SALT));
export const JWT_SECRET = process.env.JWT_SECRET;
