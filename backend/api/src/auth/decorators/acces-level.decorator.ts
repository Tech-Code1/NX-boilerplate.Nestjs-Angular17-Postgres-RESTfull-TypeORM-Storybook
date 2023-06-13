import { SetMetadata } from '@nestjs/common';
import { ACCES_LEVEL_KEY } from '../../constants/key-decorators';

export const AccessLevel = (level: keyof typeof AccessLevel) =>
  SetMetadata(ACCES_LEVEL_KEY, level);
