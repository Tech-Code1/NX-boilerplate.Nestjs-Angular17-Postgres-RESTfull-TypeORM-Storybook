import { ROLES } from "backend/database/src/constants/interfaces.entities";

export interface IPayloadToken {
    id: string;
    role: ROLES[];
}

export interface IAuthBody {
    username: string;
    password: string;
}