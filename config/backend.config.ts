import { PORT } from './constants';
import { options } from './orm.config';

export const configs = () => ({
  api: {
    port: PORT,
  },
  database: { ...options },
});
