import { SetMetadata } from "@nestjs/common";
import { ROLES } from "../../../../database/src/constants/interfaces.entities";
import { ADMIN_KEY } from '../../constants/key-decorators';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN)
