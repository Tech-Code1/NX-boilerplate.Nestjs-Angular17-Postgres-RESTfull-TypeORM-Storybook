import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "../../constants/key-decorators";
import { ROLES } from "../../constants/roles";

export const Roles = (...roles: Array<keyof typeof ROLES>) => SetMetadata(ROLES_KEY, roles);
