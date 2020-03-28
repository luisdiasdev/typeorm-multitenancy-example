import { config } from 'dotenv';

export const enum Env {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development'
}

if (process.env.NODE_ENV !== Env.PRODUCTION) {
  config();
}

const properties = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '', 10),
};

export default properties;
