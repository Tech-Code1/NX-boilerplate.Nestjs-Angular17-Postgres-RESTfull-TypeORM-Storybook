import { SetMetadata } from "@nestjs/common";
import { ROLES } from "../../../../database/src/constants/interfaces.entities";
import { ROLES_KEY } from "../../constants/key-decorators";

export const Roles = (...roles: Array<keyof typeof ROLES>) => SetMetadata(ROLES_KEY, roles);
