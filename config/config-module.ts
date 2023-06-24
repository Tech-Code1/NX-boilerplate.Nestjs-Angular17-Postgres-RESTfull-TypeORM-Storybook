import Joi from 'joi';
import { validation } from '../backend/api/src/shared/utils/validationSchema';
import { configs } from './backend.config';

export const configModule = {
  isGlobal: true,
  load: [configs],
  envFilePath: `.${process.env.NODE_ENV}.env`,
  validationSchema: Joi.object<typeof validation>(validation),
};
