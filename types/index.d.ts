declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DB_HOST: string;
        DB_PORT: string;
        DB_NAME: string;
        DB_USER: string;
        DB_PASS: string;
        HASH_SALT: string;
        JWT_SECRET: string;
    }
}