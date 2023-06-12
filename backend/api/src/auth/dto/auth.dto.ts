import { IsNotEmpty, IsString } from "class-validator";
import { IAuthBody } from "../interface/auth.interface";

export class IAuthDTO implements IAuthBody {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}