import { SetMetadata } from "@nestjs/common";
import { ACCES_LEVEL_KEY } from '../../constants/key-decorators';

export const AccesLevel = (level: number) => SetMetadata(ACCES_LEVEL_KEY, level)
