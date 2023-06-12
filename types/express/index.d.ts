import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    idUser: string;
    rolUser: string[];
  }
}