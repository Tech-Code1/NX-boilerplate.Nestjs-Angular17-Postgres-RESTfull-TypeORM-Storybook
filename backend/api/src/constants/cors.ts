import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const CORS: CorsOptions = {
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, DELETE, OPTIONS',
    credentials: true
}