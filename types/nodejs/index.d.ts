declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    HASH_SALT: number;
    SEED_DATA: number;
    JWT_SECRET: string;
    DB_SYNC: boolean;
  }
}
