import { PORT } from './constants';
import { options } from './orm.config';

export const configs = () => ({
  api: {
    port: parseInt(String(PORT), 10) || 3000,
  },
  database: { ...options },
});